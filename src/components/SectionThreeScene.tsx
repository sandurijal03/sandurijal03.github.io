import * as React from "react";
import styled from "styled-components";
import * as THREE from "three";

type SectionThreeSceneProps = {
  variant: "home" | "portfolio" | "contact";
};

type VariantPreset = {
  orbPosition: [number, number, number];
  ringPosition: [number, number, number];
  floatSpeed: number;
  rotationSpeed: number;
  particleCount: number;
};

const PRESETS: Record<SectionThreeSceneProps["variant"], VariantPreset> = {
  home: {
    orbPosition: [-1.7, 0.9, -1.2],
    ringPosition: [2.3, -1.3, -2.6],
    floatSpeed: 0.7,
    rotationSpeed: 0.2,
    particleCount: 180,
  },
  portfolio: {
    orbPosition: [-2.2, 0.4, -1.8],
    ringPosition: [2.7, 1, -2.9],
    floatSpeed: 0.56,
    rotationSpeed: 0.16,
    particleCount: 160,
  },
  contact: {
    orbPosition: [-2.6, -0.2, -1.9],
    ringPosition: [2.2, -1.2, -2.7],
    floatSpeed: 0.64,
    rotationSpeed: 0.17,
    particleCount: 140,
  },
};

const getCssVariable = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
};

const SectionThreeScene = ({ variant }: SectionThreeSceneProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const preset = PRESETS[variant];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9.6);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const orbGeometry = new THREE.IcosahedronGeometry(0.95, 1);
    const ringGeometry = new THREE.TorusKnotGeometry(0.58, 0.17, 108, 24);

    const orbMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.28,
      metalness: 0.34,
      roughness: 0.2,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.25,
      wireframe: true,
      metalness: 0.2,
      roughness: 0.35,
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(
      preset.orbPosition[0],
      preset.orbPosition[1],
      preset.orbPosition[2],
    );
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(
      preset.ringPosition[0],
      preset.ringPosition[1],
      preset.ringPosition[2],
    );
    rootGroup.add(orb, ring);

    const particlePositions = new Float32Array(preset.particleCount * 3);
    for (let index = 0; index < preset.particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 11;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 7;
      particlePositions[stride + 2] = -Math.random() * 6;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    rootGroup.add(particles);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.62);
    const pointLightA = new THREE.PointLight("#ffffff", 1.1, 20);
    pointLightA.position.set(3.8, 2.5, 6.2);
    const pointLightB = new THREE.PointLight("#ffffff", 0.84, 18);
    pointLightB.position.set(-4.3, -2.2, 4.8);
    scene.add(ambientLight, pointLightA, pointLightB);

    const applyThemeColors = () => {
      const primary = getCssVariable(
        `--${variant}-3d-primary`,
        getCssVariable("--app-3d-primary", "#4da3ff"),
      );
      const secondary = getCssVariable(
        `--${variant}-3d-secondary`,
        getCssVariable("--app-3d-secondary", "#9ad0ff"),
      );
      const particlesColor = getCssVariable(
        `--${variant}-3d-particles`,
        getCssVariable("--app-3d-particles", "#7cbfff"),
      );
      const fog = getCssVariable(
        `--${variant}-3d-fog`,
        getCssVariable("--app-3d-fog", "#101823"),
      );

      orbMaterial.color.set(primary);
      orbMaterial.emissive.set(primary);
      orbMaterial.emissiveIntensity = 0.05;

      ringMaterial.color.set(secondary);
      ringMaterial.emissive.set(secondary);
      ringMaterial.emissiveIntensity = 0.04;

      particlesMaterial.color.set(particlesColor);
      pointLightA.color.set(secondary);
      pointLightB.color.set(primary);
      scene.fog = new THREE.Fog(fog, 9, 20);
    };

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let pointerX = 0;
    let pointerY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
      pointerX = normalizedX * 0.24;
      pointerY = normalizedY * 0.16;
    };

    applyThemeColors();
    resize();

    const bodyClassObserver = new MutationObserver(() => {
      applyThemeColors();
    });
    bodyClassObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const htmlClassObserver = new MutationObserver(() => {
      applyThemeColors();
    });
    htmlClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    let frameHandle = 0;

    const renderFrame = (time: number) => {
      const elapsed = time * 0.001;

      rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.03;
      rootGroup.rotation.x += (-pointerY - rootGroup.rotation.x) * 0.03;
      rootGroup.position.y = Math.sin(elapsed * preset.floatSpeed) * 0.15;

      orb.rotation.x = elapsed * preset.rotationSpeed;
      orb.rotation.y = elapsed * preset.rotationSpeed * 0.82;
      ring.rotation.x = elapsed * (preset.rotationSpeed * 0.8);
      ring.rotation.z = elapsed * (preset.rotationSpeed * 0.9);

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = elapsed * 0.018;

      renderer.render(scene, camera);
      frameHandle = window.requestAnimationFrame(renderFrame);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      frameHandle = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frameHandle);
      bodyClassObserver.disconnect();
      htmlClassObserver.disconnect();

      orbGeometry.dispose();
      ringGeometry.dispose();
      particlesGeometry.dispose();

      orbMaterial.dispose();
      ringMaterial.dispose();
      particlesMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <SceneRoot ref={containerRef} aria-hidden="true" />;
};

const SceneRoot = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    filter: saturate(1.07) contrast(1.03);
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default SectionThreeScene;
