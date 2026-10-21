import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Coloured liquid, viewed through vertical fluted glass.
// Each slat acts as a cylindrical lens: the sample position is bent by the
// position inside the slat, and R/G/B are sampled with slightly different
// bend strengths to give a prismatic fringe.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uSlats;
  uniform float uRefract;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  // The liquid: warped fbm mapped through an ember palette.
  vec3 liquid(vec2 p, float t) {
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    float f = fbm(p + 2.5 * q + t * 0.5);
    vec3 deep  = vec3(0.03, 0.02, 0.02);
    vec3 ember = vec3(0.60, 0.22, 0.05);
    vec3 amber = vec3(0.91, 0.66, 0.29);
    vec3 cream = vec3(1.00, 0.93, 0.78);
    vec3 c = mix(deep, ember, smoothstep(0.2, 0.55, f));
    c = mix(c, amber, smoothstep(0.45, 0.75, f));
    c = mix(c, cream, smoothstep(0.78, 0.95, f) * 0.6);
    return c;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = vUv;

    float slat = uv.x * uSlats;
    float local = fract(slat) - 0.5;            // -0.5..0.5 across one slat
    float edge = pow(abs(local) * 2.0, 3.0);     // stronger bend toward the edges

    float t = uTime * 0.05;
    vec2 base = vec2(uv.x * aspect, uv.y) * 1.4;
    vec2 m = (uMouse - 0.5) * 0.35;

    float bend = local * uRefract / uSlats;
    vec3 col;
    col.r = liquid(base + vec2(bend * 1.00 * aspect, 0.0) + m, t).r;
    col.g = liquid(base + vec2(bend * 1.18 * aspect, 0.0) + m, t).g;
    col.b = liquid(base + vec2(bend * 1.36 * aspect, 0.0) + m, t).b;

    // glass shading: dark seams between slats, soft highlight on one side
    col *= 1.0 - edge * 0.55;
    col += vec3(1.0, 0.92, 0.8) * smoothstep(0.35, 0.5, -local) * 0.05;
    col += vec3(1.0, 0.92, 0.8) * exp(-pow((local + 0.38) * 14.0, 2.0)) * 0.06;

    // fade to black at the top/bottom so it blends into neighbouring sections
    col *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
    gl_FragColor = vec4(col, 1.0);
  }
`;

interface PrismaticSlatsProps {
  /** Number of glass flutes across the width. */
  slats?: number;
  /** Refraction strength. */
  refraction?: number;
  className?: string;
}

/** Coloured liquid refracted through fluted glass (WebGL). */
const PrismaticSlats: React.FC<PrismaticSlatsProps> = ({
  slats = 28,
  refraction = 6,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5) });
    } catch {
      return;
    }
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.style.cssText = "width:100%;height:100%;display:block";

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uSlats: { value: slats },
        uRefract: { value: refraction },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);

    let visible = false;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(container);

    let raf = 0;
    const render = (time: number) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      program.uniforms.uTime.value = reduced ? 10 : time * 0.001;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [slats, refraction]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 bg-slate-950 ${className}`}
    />
  );
};

export default PrismaticSlats;

