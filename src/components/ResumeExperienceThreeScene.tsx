import * as React from "react";
import styled from "styled-components";
import * as THREE from "three";

type ResumeExperienceThreeSceneProps = {
  itemCount: number;
  activeIndex: number;
};

const getCssVariable = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
};

const ResumeExperienceThreeScene = ({
  itemCount,
  activeIndex,
}: ResumeExperienceThreeSceneProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const activeIndexRef = React.useRef(activeIndex);

  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.45, 8.6);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const nodesCount = Math.max(itemCount, 3);
    const nodeGeometry = new THREE.IcosahedronGeometry(0.24, 1);
    const ringGeometry = new THREE.TorusGeometry(0.38, 0.024, 12, 48);

    const nodeMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.72,
      metalness: 0.35,
      roughness: 0.22,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.32,
      metalness: 0.28,
      roughness: 0.3,
      wireframe: true,
    });

    const nodeMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let index = 0; index < nodesCount; index += 1) {
      const t = nodesCount === 1 ? 0.5 : index / (nodesCount - 1);
      const x = -3 + t * 6;
      const y =
        Math.sin(t * Math.PI * 1.1) * 0.85 + (Math.random() - 0.5) * 0.18;
      const z = -1.2 - Math.cos(t * Math.PI) * 0.45;

      const position = new THREE.Vector3(x, y, z);
      nodePositions.push(position);

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position);
      rootGroup.add(node);
      nodeMeshes.push(node);

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.rotation.x = Math.PI * 0.5;
      rootGroup.add(ring);
      ringMeshes.push(ring);
    }

    const trailCurve = new THREE.CatmullRomCurve3(
      nodePositions,
      false,
      "catmullrom",
      0.45,
    );
    const trailGeometry = new THREE.TubeGeometry(
      trailCurve,
      160,
      0.04,
      8,
      false,
    );
    const trailMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.46,
      metalness: 0.24,
      roughness: 0.34,
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    rootGroup.add(trail);

    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 10;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 5;
      particlePositions[stride + 2] = -Math.random() * 4.4;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.032,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    rootGroup.add(particles);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.7);
    const keyLight = new THREE.PointLight("#ffffff", 1.2, 24);
    keyLight.position.set(3.8, 2.5, 5.8);
    const rimLight = new THREE.PointLight("#ffffff", 0.9, 20);
    rimLight.position.set(-4, -2.2, 4.6);

    scene.add(ambientLight, keyLight, rimLight);

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

      pointerX = normalizedX * 0.28;
      pointerY = normalizedY * 0.18;
    };

    const applyThemeColors = () => {
      const primary = getCssVariable(
        "--resume-experience-3d-primary",
        "#67b6ff",
      );
      const secondary = getCssVariable(
        "--resume-experience-3d-secondary",
        "#9bd4ff",
      );
      const trailColor = getCssVariable(
        "--resume-experience-3d-trail",
        "#6db7ff",
      );
      const particleColor = getCssVariable(
        "--resume-experience-3d-particle",
        "#7abfff",
      );
      const fogColor = getCssVariable("--resume-experience-3d-fog", "#101823");

      nodeMaterial.color.set(primary);
      nodeMaterial.emissive.set(primary);
      nodeMaterial.emissiveIntensity = 0.08;

      ringMaterial.color.set(secondary);
      ringMaterial.emissive.set(secondary);
      ringMaterial.emissiveIntensity = 0.06;

      trailMaterial.color.set(trailColor);
      trailMaterial.emissive.set(trailColor);
      trailMaterial.emissiveIntensity = 0.04;

      particlesMaterial.color.set(particleColor);
      keyLight.color.set(secondary);
      rimLight.color.set(primary);
      scene.fog = new THREE.Fog(fogColor, 8, 18);
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
      const clampedActive = THREE.MathUtils.clamp(
        activeIndexRef.current,
        0,
        nodesCount - 1,
      );

      rootGroup.rotation.y += (pointerX - rootGroup.rotation.y) * 0.022;
      rootGroup.rotation.x += (-pointerY - rootGroup.rotation.x) * 0.022;
      rootGroup.position.y = Math.sin(elapsed * 0.9) * 0.08;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        pointerX * 1.3,
        0.03,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        0.45 + pointerY * 0.6,
        0.03,
      );
      camera.lookAt(0, 0.1, -0.9);

      for (let index = 0; index < nodesCount; index += 1) {
        const distance = Math.abs(index - clampedActive);
        const focusFactor = THREE.MathUtils.clamp(1 - distance * 0.35, 0.35, 1);
        const pulse = 1 + Math.sin(elapsed * 2.4 + index * 0.7) * 0.045;

        const targetScale = focusFactor * pulse;
        nodeMeshes[index].scale.setScalar(
          THREE.MathUtils.lerp(nodeMeshes[index].scale.x, targetScale, 0.12),
        );

        ringMeshes[index].rotation.z += 0.008 * focusFactor;
        ringMeshes[index].scale.setScalar(
          THREE.MathUtils.lerp(
            ringMeshes[index].scale.x,
            0.92 + focusFactor * 0.4,
            0.08,
          ),
        );
      }

      trail.rotation.y = Math.sin(elapsed * 0.2) * 0.1;
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

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

      nodeGeometry.dispose();
      ringGeometry.dispose();
      trailGeometry.dispose();
      particlesGeometry.dispose();

      nodeMaterial.dispose();
      ringMaterial.dispose();
      trailMaterial.dispose();
      particlesMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [itemCount]);

  return <SceneWrapper ref={containerRef} aria-hidden="true" />;
};

const SceneWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.85;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.4) 70%,
    transparent
  );

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    filter: saturate(1.08) contrast(1.03);
  }

  @media screen and (max-width: 1100px) {
    opacity: 0.72;
  }

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export default ResumeExperienceThreeScene;
