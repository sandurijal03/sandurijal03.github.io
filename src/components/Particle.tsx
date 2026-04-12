import * as React from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const Particle = () => {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <>
      <Particles
        options={{
          particles: {
            number: {
              value: 109,
              density: {
                enable: true,
                width: 1200,
                height: 1200,
              },
            },
            color: {
              value: '#636e72',
            },
            shape: {
              type: 'circle',
            },
            links: {
              enable: false,
              distance: 150,
              opacity: 0.9,
              width: 1,
              shadow: {
                enable: true,
                color: '#e74c3c',
                blur: 5,
              },
            },
            move: {
              enable: true,
              random: true,
              speed: 0.6,
              attract: {
                enable: false,
                rotate: {
                  x: 600,
                  y: 1200,
                },
              },
            },
            size: {
              value: { min: 0.1, max: 4 },
              animation: {
                enable: true,
                speed: 40,
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 1,
                startValue: 'random',
              },
            },
          },
        }}
      />
    </>
  );
};

export default Particle;
