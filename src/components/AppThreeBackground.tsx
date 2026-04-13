import * as React from "react";
import styled from "styled-components";
import * as THREE from "three";

const getCssVariable = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
};

const AppThreeBackground = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 120);
    camera.position.set(0, 0.25, 11.5);

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

    const orbGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const ringGeometry = new THREE.TorusKnotGeometry(0.85, 0.26, 128, 24);
    const crystalGeometry = new THREE.OctahedronGeometry(1.08, 0);

    const orbMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.2,
      metalness: 0.42,
      roughness: 0.26,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.17,
      wireframe: true,
      metalness: 0.22,
      roughness: 0.34,
    });
    const crystalMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.14,
      wireframe: true,
      metalness: 0.45,
      roughness: 0.2,
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(-3.6, 1.7, -4.2);

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(3.7, -2, -5.6);

    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(0.7, 2.8, -7.5);

    rootGroup.add(orb, ring, crystal);

    const particleCount = 460;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 20;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 12;
      particlePositions[stride + 2] = -Math.random() * 18;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.072,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -1;
    rootGroup.add(particles);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.72);
    const pointLightA = new THREE.PointLight("#ffffff", 1.2, 44);
    pointLightA.position.set(4.5, 4.8, 8);
    const pointLightB = new THREE.PointLight("#ffffff", 1, 34);
    pointLightB.position.set(-5.4, -3.6, 7);
    scene.add(ambientLight, pointLightA, pointLightB);

    const applyThemeColors = () => {
      const primary = getCssVariable("--app-3d-primary", "#4da3ff");
      const secondary = getCssVariable("--app-3d-secondary", "#9ad0ff");
      const accent = getCssVariable("--app-3d-accent", "#5a8bdc");
      const particlesColor = getCssVariable("--app-3d-particles", "#7cbfff");
      const fogColor = getCssVariable("--app-3d-fog", "#101823");

      orbMaterial.color.set(primary);
      orbMaterial.emissive.set(primary);
      orbMaterial.emissiveIntensity = 0.05;

      ringMaterial.color.set(secondary);
      ringMaterial.emissive.set(secondary);
      ringMaterial.emissiveIntensity = 0.04;

      crystalMaterial.color.set(accent);
      crystalMaterial.emissive.set(accent);
      crystalMaterial.emissiveIntensity = 0.05;

      particlesMaterial.color.set(particlesColor);
      pointLightA.color.set(secondary);
      pointLightB.color.set(primary);
      scene.fog = new THREE.Fog(fogColor, 14, 34);
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
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      pointerX = normalizedX * 0.3;
      pointerY = normalizedY * 0.18;
    };

    const handleScroll = () => {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = THREE.MathUtils.clamp(
        window.scrollY / scrollableHeight,
        0,
        1,
      );
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
      rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.02;
      rootGroup.rotation.x += (-pointerY - rootGroup.rotation.x) * 0.02;
      rootGroup.position.y =
        Math.sin(elapsed * 0.36) * 0.28 - scrollProgress * 0.48;

      orb.rotation.x = elapsed * 0.12;
      orb.rotation.y = elapsed * 0.09;
      ring.rotation.x = elapsed * 0.09;
      ring.rotation.z = elapsed * 0.11;
      crystal.rotation.y = elapsed * 0.13;
      crystal.rotation.z = elapsed * 0.12;

      particles.rotation.y = elapsed * 0.014;
      particles.rotation.x = elapsed * 0.008;

      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        11.5 - scrollProgress * 0.9,
        0.04,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        0.25 + pointerY * 0.5 + scrollProgress * 0.14,
        0.04,
      );
      camera.lookAt(0, 0, -2);

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

  return <BackgroundLayer ref={containerRef} aria-hidden="true" />;
};

const BackgroundLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.84;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    filter: saturate(1.06) contrast(1.03);
  }

  @media screen and (max-width: 980px) {
    opacity: 0.66;
  }
`;

export default AppThreeBackground;
