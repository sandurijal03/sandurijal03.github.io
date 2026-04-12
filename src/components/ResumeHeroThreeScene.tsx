import * as React from "react";
import styled from "styled-components";
import * as THREE from "three";

const getCssVariable = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
};

type ResumeHeroThreeSceneProps = {
  activeCategory?: string;
};

type ScenePreset = {
  orb: [number, number, number];
  ring: [number, number, number];
  crystal: [number, number, number];
  motion: number;
  floatAmp: number;
  particleSize: number;
  cameraDepth: number;
  cameraLift: number;
};

const getScenePreset = (category?: string): ScenePreset => {
  switch (category) {
    case "Programming Languages":
      return {
        orb: [-2.2, -0.55, -1.35],
        ring: [1.3, -0.1, -0.7],
        crystal: [0.85, 1.2, -1.85],
        motion: 1.18,
        floatAmp: 0.16,
        particleSize: 0.056,
        cameraDepth: 1.15,
        cameraLift: 0.3,
      };
    case "Frontend Technologies":
      return {
        orb: [-1.75, -0.38, -1.05],
        ring: [2.1, -0.22, -0.45],
        crystal: [0.25, 1.35, -1.45],
        motion: 1.04,
        floatAmp: 0.14,
        particleSize: 0.052,
        cameraDepth: 0.95,
        cameraLift: 0.24,
      };
    case "Backend & Cloud":
      return {
        orb: [-2.05, -0.4, -1.35],
        ring: [1.95, -0.28, -0.75],
        crystal: [0.4, 1.05, -1.95],
        motion: 0.96,
        floatAmp: 0.11,
        particleSize: 0.05,
        cameraDepth: 1.2,
        cameraLift: 0.34,
      };
    case "Databases":
      return {
        orb: [-1.55, -0.55, -1.1],
        ring: [2.25, -0.18, -0.5],
        crystal: [0.55, 1.48, -1.55],
        motion: 0.88,
        floatAmp: 0.1,
        particleSize: 0.046,
        cameraDepth: 0.84,
        cameraLift: 0.19,
      };
    case "Microsoft Technologies":
      return {
        orb: [-2.15, -0.34, -1.45],
        ring: [1.62, -0.34, -0.6],
        crystal: [0.62, 1.02, -1.88],
        motion: 1,
        floatAmp: 0.12,
        particleSize: 0.05,
        cameraDepth: 1,
        cameraLift: 0.26,
      };
    case "Blockchain & Web3":
      return {
        orb: [-2.3, -0.62, -1.58],
        ring: [1.58, -0.12, -0.66],
        crystal: [0.98, 1.42, -1.6],
        motion: 1.24,
        floatAmp: 0.17,
        particleSize: 0.06,
        cameraDepth: 1.25,
        cameraLift: 0.38,
      };
    default:
      return {
        orb: [-1.95, -0.42, -1.2],
        ring: [1.85, -0.25, -0.55],
        crystal: [0.35, 1.2, -1.7],
        motion: 1,
        floatAmp: 0.12,
        particleSize: 0.05,
        cameraDepth: 1,
        cameraLift: 0.26,
      };
  }
};

const ResumeHeroThreeScene = ({
  activeCategory,
}: ResumeHeroThreeSceneProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const activeCategoryRef = React.useRef(activeCategory);

  React.useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const orbGeometry = new THREE.IcosahedronGeometry(0.92, 1);
    const ringGeometry = new THREE.TorusKnotGeometry(0.62, 0.17, 128, 24);
    const crystalGeometry = new THREE.OctahedronGeometry(0.78, 0);

    const orbMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.4,
      metalness: 0.35,
      roughness: 0.2,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.33,
      wireframe: true,
      metalness: 0.2,
      roughness: 0.35,
    });
    const crystalMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.3,
      wireframe: true,
      metalness: 0.5,
      roughness: 0.18,
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(-1.95, -0.42, -1.2);

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(1.85, -0.25, -0.55);

    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(0.35, 1.2, -1.7);

    rootGroup.add(orb, ring, crystal);

    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 9;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 5;
      particlePositions[stride + 2] = -Math.random() * 4.5;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -0.5;
    rootGroup.add(particles);

    const orbTarget = new THREE.Vector3();
    const ringTarget = new THREE.Vector3();
    const crystalTarget = new THREE.Vector3();

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.65);
    const pointLightA = new THREE.PointLight("#ffffff", 1.25, 24);
    pointLightA.position.set(3.5, 2.8, 6);
    const pointLightB = new THREE.PointLight("#ffffff", 0.9, 20);
    pointLightB.position.set(-4, -2.4, 4);

    scene.add(ambientLight, pointLightA, pointLightB);

    const applyThemeColors = () => {
      const primary = getCssVariable("--resume-3d-primary", "#4da3ff");
      const secondary = getCssVariable("--resume-3d-secondary", "#9ad0ff");
      const wire = getCssVariable("--resume-3d-wire", "#69b4ff");
      const particlesColor = getCssVariable("--resume-3d-particles", "#7cbfff");
      const fog = getCssVariable("--resume-3d-fog", "#101823");
      const lightA = getCssVariable("--resume-3d-light-a", "#63adff");
      const lightB = getCssVariable("--resume-3d-light-b", "#2f7dd1");

      orbMaterial.color.set(primary);
      orbMaterial.emissive.set(primary);
      orbMaterial.emissiveIntensity = 0.07;

      ringMaterial.color.set(secondary);
      ringMaterial.emissive.set(secondary);
      ringMaterial.emissiveIntensity = 0.06;

      crystalMaterial.color.set(wire);
      crystalMaterial.emissive.set(wire);
      crystalMaterial.emissiveIntensity = 0.06;

      particlesMaterial.color.set(particlesColor);
      scene.fog = new THREE.Fog(fog, 8, 18);
      pointLightA.color.set(lightA);
      pointLightB.color.set(lightB);
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

      pointerX = normalizedX * 0.3;
      pointerY = normalizedY * 0.2;
    };

    const handleScroll = () => {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = window.scrollY / scrollableHeight;

      scrollProgress = THREE.MathUtils.clamp(progress, 0, 1);
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
      const preset = getScenePreset(activeCategoryRef.current);

      orbTarget.set(preset.orb[0], preset.orb[1], preset.orb[2]);
      ringTarget.set(preset.ring[0], preset.ring[1], preset.ring[2]);
      crystalTarget.set(
        preset.crystal[0],
        preset.crystal[1],
        preset.crystal[2],
      );

      orb.position.lerp(orbTarget, 0.05);
      ring.position.lerp(ringTarget, 0.05);
      crystal.position.lerp(crystalTarget, 0.05);

      orb.rotation.x = elapsed * (0.35 * preset.motion);
      orb.rotation.y = elapsed * (0.24 * preset.motion);
      ring.rotation.x = elapsed * (0.22 * preset.motion);
      ring.rotation.z = elapsed * (0.2 * preset.motion);
      crystal.rotation.y = elapsed * (0.3 * preset.motion);
      crystal.rotation.z = elapsed * (0.28 * preset.motion);

      particles.rotation.y = elapsed * 0.06;
      particles.rotation.x = elapsed * 0.04;

      particlesMaterial.size = THREE.MathUtils.lerp(
        particlesMaterial.size,
        preset.particleSize,
        0.05,
      );

      const scrollTilt = (scrollProgress - 0.25) * 0.34;

      rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.025;
      rootGroup.rotation.x +=
        (-pointerY + scrollTilt - rootGroup.rotation.x) * 0.025;
      rootGroup.position.y =
        Math.sin(elapsed * (0.8 * preset.motion)) * preset.floatAmp -
        scrollProgress * 0.24;

      const targetCameraZ = 8 - scrollProgress * preset.cameraDepth;
      const targetCameraY = 0.2 + scrollProgress * preset.cameraLift;
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        targetCameraZ,
        0.045,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        targetCameraY,
        0.045,
      );
      camera.lookAt(0, 0, 0);

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
      crystalGeometry.dispose();
      particlesGeometry.dispose();

      orbMaterial.dispose();
      ringMaterial.dispose();
      crystalMaterial.dispose();
      particlesMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <SceneWrapper ref={containerRef} aria-hidden="true" />;
};

const SceneWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.78;
  mask-image: radial-gradient(circle at 60% 45%, black, transparent 78%);

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    filter: saturate(1.1) contrast(1.04);
  }

  @media screen and (max-width: 900px) {
    opacity: 0.64;
  }
`;

export default ResumeHeroThreeScene;
