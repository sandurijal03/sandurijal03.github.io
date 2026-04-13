import * as React from "react";
import styled from "styled-components";
import * as THREE from "three";

type SectionThreeSceneProps = {
  variant: "home" | "portfolio" | "contact";
};

type VariantPreset = {
  orbPosition: [number, number, number];
  ringPosition: [number, number, number];
  accentPosition: [number, number, number];
  floatSpeed: number;
  rotationSpeed: number;
  particleCount: number;
};

const PRESETS: Record<SectionThreeSceneProps["variant"], VariantPreset> = {
  home: {
    orbPosition: [-1.7, 0.9, -1.2],
    ringPosition: [2.3, -1.3, -2.6],
    accentPosition: [0.6, 1.9, -2.2],
    floatSpeed: 0.7,
    rotationSpeed: 0.2,
    particleCount: 180,
  },
  portfolio: {
    orbPosition: [-2.2, 0.4, -1.8],
    ringPosition: [2.7, 1, -2.9],
    accentPosition: [0.3, -1.7, -2.4],
    floatSpeed: 0.56,
    rotationSpeed: 0.16,
    particleCount: 160,
  },
  contact: {
    orbPosition: [-2.6, -0.2, -1.9],
    ringPosition: [2.2, -1.2, -2.7],
    accentPosition: [0.1, 1.4, -2.3],
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
    const accentGeometry = new THREE.DodecahedronGeometry(0.44, 0);
    const satelliteGeometry = new THREE.SphereGeometry(0.08, 14, 14);

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
    const accentMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.23,
      wireframe: true,
      metalness: 0.42,
      roughness: 0.2,
    });
    const satelliteMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.45,
      metalness: 0.3,
      roughness: 0.24,
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

    const accent = new THREE.Mesh(accentGeometry, accentMaterial);
    accent.position.set(
      preset.accentPosition[0],
      preset.accentPosition[1],
      preset.accentPosition[2],
    );

    const satellites = Array.from({ length: 4 }, () => {
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      rootGroup.add(satellite);
      return satellite;
    });

    const linkCurve = new THREE.QuadraticBezierCurve3(
      orb.position.clone(),
      new THREE.Vector3(
        (preset.orbPosition[0] + preset.ringPosition[0]) * 0.42,
        Math.max(preset.orbPosition[1], preset.ringPosition[1]) + 1,
        (preset.orbPosition[2] + preset.ringPosition[2]) * 0.5 - 0.7,
      ),
      ring.position.clone(),
    );
    const linkGeometry = new THREE.TubeGeometry(linkCurve, 42, 0.02, 8, false);
    const linkMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.18,
      metalness: 0.2,
      roughness: 0.35,
    });
    const link = new THREE.Mesh(linkGeometry, linkMaterial);

    rootGroup.add(orb, ring, accent, link);

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
      const accentColor = getCssVariable(
        `--${variant}-3d-accent`,
        getCssVariable("--app-3d-accent", "#5b92e0"),
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

      accentMaterial.color.set(accentColor);
      accentMaterial.emissive.set(accentColor);
      accentMaterial.emissiveIntensity = 0.05;

      satelliteMaterial.color.set(secondary);
      satelliteMaterial.emissive.set(primary);
      satelliteMaterial.emissiveIntensity = 0.08;

      linkMaterial.color.set(accentColor);
      linkMaterial.emissive.set(secondary);
      linkMaterial.emissiveIntensity = 0.04;

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
    let scrollProgress = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
      pointerX = normalizedX * 0.24;
      pointerY = normalizedY * 0.16;
    };

    const handleScroll = () => {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = THREE.MathUtils.clamp(window.scrollY / scrollableHeight, 0, 1);
    };

    applyThemeColors();
    resize();
    handleScroll();

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
    window.addEventListener("scroll", handleScroll, { passive: true });

    let frameHandle = 0;

    const renderFrame = (time: number) => {
      const elapsed = time * 0.001;

      rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.03;
      rootGroup.rotation.x += (-pointerY - rootGroup.rotation.x) * 0.03;
      rootGroup.position.y =
        Math.sin(elapsed * preset.floatSpeed) * 0.15 - scrollProgress * 0.18;

      orb.rotation.x = elapsed * preset.rotationSpeed;
      orb.rotation.y = elapsed * preset.rotationSpeed * 0.82;
      ring.rotation.x = elapsed * (preset.rotationSpeed * 0.8);
      ring.rotation.z = elapsed * (preset.rotationSpeed * 0.9);
      accent.rotation.x = elapsed * (preset.rotationSpeed * 0.55);
      accent.rotation.y = elapsed * (preset.rotationSpeed * 0.72);

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = elapsed * 0.018;

      link.rotation.y = Math.sin(elapsed * 0.25) * 0.08;
      linkMaterial.opacity = 0.14 + (Math.sin(elapsed * 1.2) + 1) * 0.04;

      for (let index = 0; index < satellites.length; index += 1) {
        const angle = elapsed * (0.65 + index * 0.08) + index * 1.5;
        const radius = 0.72 + index * 0.12;
        satellites[index].position.set(
          orb.position.x + Math.cos(angle) * radius,
          orb.position.y + Math.sin(angle * 0.8) * 0.32,
          orb.position.z + Math.sin(angle) * radius,
        );
      }

      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        9.6 - scrollProgress * 0.42,
        0.05,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        0.15 + pointerY * 0.22 + scrollProgress * 0.06,
        0.05,
      );
      camera.lookAt(0, 0, -2.2);

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
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameHandle);
      bodyClassObserver.disconnect();
      htmlClassObserver.disconnect();

      orbGeometry.dispose();
      ringGeometry.dispose();
      accentGeometry.dispose();
      satelliteGeometry.dispose();
      linkGeometry.dispose();
      particlesGeometry.dispose();

      orbMaterial.dispose();
      ringMaterial.dispose();
      accentMaterial.dispose();
      satelliteMaterial.dispose();
      linkMaterial.dispose();
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
