import { education, personalInfo, workExperience } from "../data/resume";

const summaryText =
  "Senior Software Engineer with 8+ years building and shipping production web applications across frontend and backend systems. Strong hands-on ownership across React/TypeScript interfaces, .NET and Node.js APIs, data-backed workflows, and cross-functional delivery in remote teams.";

const targetRoles =
  "Target Roles: Senior Software Engineer | Full-Stack Engineer | Frontend Engineer";

const highlights = [
  "8+ years in software engineering across product and platform work",
  "Senior ownership of end-to-end features from API to UI",
  "Production experience with React, TypeScript, .NET, Node.js, GraphQL",
  "Cross-domain capability including cloud workflows and blockchain prototypes",
];

const experienceImpact: Record<string, string[]> = {
  "norbrik-2022": [
    "Owned end-to-end delivery of enterprise product features across .NET APIs and React/TypeScript frontend.",
    "Built SharePoint components and Azure SQL-backed workflows for internal and client-facing systems.",
  ],
  "ibriz-2021": [
    "Ramp-up in Rust from scratch and built Solana/Anchor smart-contract prototypes and CLI tools.",
    "Delivered blockchain proof-of-concepts while exploring Solana and Ethereum development patterns.",
  ],
  "unilink-2021": [
    "Built backend services with Node.js/Express, including REST and GraphQL APIs.",
    "Implemented React + Redux + Apollo frontend features connected to SQL and MongoDB data stores.",
  ],
  "freelance-2019": [
    "Delivered multiple client-facing MERN and GraphQL applications from concept to deployment.",
    "Worked directly with stakeholders to turn requirements into production-ready solutions.",
  ],
  "subisu-2017": [
    "Supported network infrastructure operations and technical issue resolution in a high-volume environment.",
    "Recognized as Best Employee of the Month in IP Engineering for service quality and reliability.",
  ],
};

const certifications = [
  {
    title: "Build Web App with React.js",
    issuer: "OpenClassrooms",
    period: "Issued Jul 2019",
  },
  {
    title: "Best Employee of the Month (Evening Shift)",
    issuer: "IP Engineering Department, Subisu Cablenet Pvt. Ltd.",
    period: "Bhadra 2074 (Aug/Sep 2017)",
  },
];

const orderedTechnicalSkills: Array<{ title: string; items: string[] }> = [
  {
    title: "Languages",
    items: ["rust", "javascript", "typescript", "go", "python"],
  },
  {
    title: "Frontend",
    items: [
      "react",
      "nextjs",
      "redux",
      "html5",
      "css3",
      "styled-components",
      "material-ui",
      "sharepoint",
      "spfx-web-parts",
      "spfx-extensions",
    ],
  },
  {
    title: "Backend and Data",
    items: [
      "nodejs",
      "expressjs",
      "handlebars",
      "chi",
      "actix-web",
      "rest-api",
      "graphql",
      "apollo",
      "mongodb",
      "postgresql",
    ],
  },
  {
    title: "Tooling",
    items: [
      "jest",
      "git",
      "npm",
      "yarn",
      "webpack",
      "docker",
      "kubernetes",
      "nginx",
      "postman",
      "vscode",
      "linux",
    ],
  },
];

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const normalizeExternalUrl = (value: string): string => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

const renderSkills = (): string => {
  return orderedTechnicalSkills
    .map((category) => {
      const safeCategory = escapeHtml(category.title);
      const skillsLine = category.items
        .map((skill) => escapeHtml(skill))
        .join(", ");

      return `
        <article class=\"skill-card\">
          <h4>${safeCategory}</h4>
          <p class=\"skill-line\">${skillsLine}</p>
        </article>
      `;
    })
    .join("");
};

const renderExperienceItem = (
  item: (typeof workExperience)[number],
): string => {
  const lineOne = `${escapeHtml(item.title)} | ${escapeHtml(item.company)}`;
  const lineTwo = `${escapeHtml(item.duration)} | ${escapeHtml(item.location || "")}`;
  const points = experienceImpact[item.id] ?? [];
  const pointsHtml = points
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");
  const descriptionHtml = points.length
    ? `<ul class=\"impact-points\">${pointsHtml}</ul>`
    : `<p>${escapeHtml(item.description)}</p>`;

  return `
    <article class=\"entry\">
      <h4>${lineOne}</h4>
      <div class=\"meta\">${lineTwo}</div>
      ${descriptionHtml}
      <p class=\"stack\"><strong>Stack:</strong> ${escapeHtml(item.technologies || "N/A")}</p>
    </article>
  `;
};

const renderExperience = (): { firstEntry: string; otherEntries: string } => {
  if (workExperience.length === 0) {
    return { firstEntry: "", otherEntries: "" };
  }

  const [firstItem, ...otherItems] = workExperience;

  return {
    firstEntry: renderExperienceItem(firstItem),
    otherEntries: otherItems.map((item) => renderExperienceItem(item)).join(""),
  };
};

const renderEducation = (): string => {
  return education
    .map(
      (item) => `
      <article class=\"entry\">
        <h4>${escapeHtml(item.degree)} | ${escapeHtml(item.institution)}</h4>
        <div class=\"meta\">${escapeHtml(item.duration)} | ${escapeHtml(item.location)}</div>
        <p>${escapeHtml(item.description)}</p>
      </article>
    `,
    )
    .join("");
};

const renderCertifications = (): string => {
  return certifications
    .map(
      (item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.issuer)}</span>
        <small>${escapeHtml(item.period)}</small>
      </li>
    `,
    )
    .join("");
};

const getCvHtml = (): string => {
  const name = escapeHtml(personalInfo.name);
  const title = escapeHtml(personalInfo.title);
  const tagline = escapeHtml(personalInfo.tagline);
  const email = escapeHtml(personalInfo.email);
  const location = escapeHtml(personalInfo.location);
  const github = escapeHtml(personalInfo.github);
  const linkedin = escapeHtml(personalInfo.linkedin);
  const website = escapeHtml(personalInfo.website);
  const githubUrl = escapeHtml(normalizeExternalUrl(personalInfo.github));
  const websiteUrl = escapeHtml(normalizeExternalUrl(personalInfo.website));
  const experienceSections = renderExperience();

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset=\"utf-8\" />
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
      <title>${name} - CV</title>
      <style>
        @page {
          size: A4;
          margin: 0.38in;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        body {
          margin: 0;
          color: #162033;
          background: #f4f7ff;
          font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .sheet {
          width: 100%;
          max-width: 900px;
          margin: 20px auto;
          background: #ffffff;
          border: 1px solid #dce4f7;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(18, 34, 73, 0.18);
        }

        header {
          padding: 26px 30px 22px;
          background: linear-gradient(125deg, #0f2242, #1e4b97 45%, #3f78d2);
          color: #f7fbff;
        }

        .name {
          margin: 0;
          font-size: 31px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .title {
          margin: 4px 0 0;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          opacity: 1;
          display: inline-block;
          background: rgba(6, 17, 36, 0.28);
          border: 1px solid rgba(224, 236, 255, 0.3);
          border-radius: 999px;
          padding: 4px 10px;
        }

        .tagline {
          margin: 8px 0 12px;
          font-size: 12.5px;
          color: #d7e6ff;
        }

        .target-roles {
          margin: 0 0 12px;
          font-size: 10.4px;
          color: #c3dcff;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .contact {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px 14px;
          font-size: 11px;
          color: #ecf4ff;
        }

        .contact span,
        .contact a {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contact a {
          color: #ecf4ff;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }

        main {
          padding: 16px 20px 20px;
          display: grid;
          gap: 10px;
        }

        .panel {
          border: 1px solid #dbe5f8;
          border-radius: 12px;
          padding: 10px 12px;
          background: linear-gradient(180deg, #ffffff, #f9fbff);
        }

        h3 {
          margin: 0 0 6px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.9px;
          color: #1b3d78;
        }

        p {
          margin: 0;
          line-height: 1.34;
          font-size: 11px;
          color: #2a3552;
        }

        .highlights {
          margin: 8px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .highlights li {
          border: 1px solid #dbe5f8;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 10px;
          background: #f3f8ff;
        }

        .grid-two {
          display: grid;
          grid-template-columns: 1.14fr 0.86fr;
          gap: 10px;
          align-items: start;
        }

        .entries {
          display: grid;
          gap: 8px;
        }

        .entry {
          border-left: 3px solid #2f5fae;
          padding-left: 8px;
        }

        .experience-intro {
          display: grid;
          gap: 8px;
        }

        .entry h4 {
          margin: 0;
          font-size: 11px;
          color: #122449;
        }

        .entry .meta {
          margin-top: 2px;
          font-size: 10px;
          color: #4a5874;
        }

        .entry p {
          margin-top: 4px;
          font-size: 10.5px;
        }

        .impact-points {
          margin: 4px 0 0 15px;
          padding: 0;
          display: grid;
          gap: 2px;
        }

        .impact-points li {
          font-size: 10.2px;
          line-height: 1.28;
          color: #2a3552;
        }

        .entry .stack {
          margin-top: 4px;
          color: #35507b;
          font-size: 10px;
        }

        .skill-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 7px;
        }

        .skill-card {
          border: 1px solid #dbe5f8;
          border-radius: 9px;
          padding: 7px;
          background: #ffffff;
        }

        .skill-card h4 {
          margin: 0 0 5px;
          font-size: 10.4px;
          color: #17366b;
        }

        .skill-line {
          margin: 0;
          font-size: 9.6px;
          line-height: 1.34;
          color: #25497f;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .tag {
          border: 1px solid #bfd2f3;
          background: #edf4ff;
          color: #17386b;
          border-radius: 999px;
          font-size: 9.5px;
          padding: 2px 7px;
          line-height: 1.2;
        }

        .certs {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 7px;
        }

        .certs li {
          display: grid;
          gap: 2px;
          border: 1px solid #dbe5f8;
          border-radius: 9px;
          padding: 6px 7px;
          background: #ffffff;
        }

        .certs strong {
          font-size: 10.4px;
          color: #152f57;
        }

        .certs span,
        .certs small {
          font-size: 9.4px;
          color: #4a5976;
        }

        @media print {
          body {
            background: #fff;
          }

          .grid-two {
            display: block;
          }

          .grid-two > .panel {
            margin-bottom: 8px;
          }

          .panel {
            padding: 8px 9px;
            border-radius: 0;
          }

          h3 {
            margin-bottom: 4px;
            font-size: 10.8px;
          }

          .entries {
            gap: 5px;
          }

          .entry {
            border-left-width: 2px;
            padding-left: 6px;
          }

          .entry h4 {
            font-size: 10.2px;
          }

          .entry .meta {
            margin-top: 1px;
            font-size: 9.1px;
          }

          .entry p,
          .entry .stack {
            margin-top: 2px;
            font-size: 9.4px;
            line-height: 1.25;
          }

          .skill-card {
            padding: 6px;
          }

          .skill-card h4 {
            margin-bottom: 3px;
            font-size: 9.8px;
          }

          .skill-line {
            font-size: 8.8px;
            line-height: 1.28;
          }

          .target-roles {
            margin-bottom: 8px;
            font-size: 9px;
          }

          .contact a {
            color: #0f2242;
          }

          .title {
            color: #0f2242;
            text-shadow: none;
            background: #e8f0ff;
            border-color: #bfd2f3;
          }

          .impact-points {
            margin-top: 2px;
            margin-left: 12px;
            gap: 1px;
          }

          .impact-points li {
            font-size: 9.1px;
            line-height: 1.22;
          }

          .experience-panel h3 {
            break-after: avoid;
            page-break-after: avoid;
          }

          .experience-panel .experience-intro {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .experience-panel .entries {
            break-before: avoid;
            page-break-before: avoid;
          }

          .sheet {
            margin: 0;
            max-width: none;
            border-radius: 0;
            border: 0;
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <article class=\"sheet\">
        <header>
          <h1 class=\"name\">${name}</h1>
          <p class=\"title\">${title}</p>
          <p class=\"tagline\">${tagline}</p>
          <p class=\"target-roles\">${escapeHtml(targetRoles)}</p>
          <div class=\"contact\">
            <span>Email: ${email}</span>
            <span>Location: ${location}</span>
            <a href=\"${websiteUrl}\" target=\"_blank\" rel=\"noreferrer noopener\">Website: ${website}</a>
            <a href=\"${githubUrl}\" target=\"_blank\" rel=\"noreferrer noopener\">GitHub: ${github}</a>
            <span>LinkedIn: ${linkedin}</span>
            <span>Open to: Remote/Hybrid Roles</span>
          </div>
        </header>

        <main>
          <section class=\"panel\">
            <h3>Summary</h3>
            <p>${escapeHtml(summaryText)}</p>
            <ul class=\"highlights\">
              ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>

          <div class=\"grid-two\">
            <section class=\"panel experience-panel\">
              <div class=\"experience-intro\">
                <h3>Professional Experience</h3>
                ${experienceSections.firstEntry}
              </div>
              <div class=\"entries\">${experienceSections.otherEntries}</div>
            </section>

            <section class=\"panel\">
              <h3>Technical Skills</h3>
              <div class=\"skill-grid\">${renderSkills()}</div>
            </section>
          </div>

          <div class=\"grid-two\">
            <section class=\"panel\">
              <h3>Education</h3>
              <div class=\"entries\">${renderEducation()}</div>
            </section>

            <section class=\"panel\">
              <h3>Recognition & Certification</h3>
              <ul class=\"certs\">${renderCertifications()}</ul>
            </section>
          </div>
        </main>
      </article>
    </body>
  </html>
  `;
};

export const downloadCvPdf = (): void => {
  const html = getCvHtml();
  const iframe = document.createElement("iframe");

  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";

  const cleanup = () => {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  iframe.onload = () => {
    const frameWindow = iframe.contentWindow;

    if (!frameWindow) {
      cleanup();
      window.alert("Unable to open CV print view. Please try again.");
      return;
    }

    const handleAfterPrint = () => {
      frameWindow.removeEventListener("afterprint", handleAfterPrint);
      window.setTimeout(cleanup, 0);
    };

    frameWindow.addEventListener("afterprint", handleAfterPrint);
    frameWindow.focus();
    frameWindow.print();

    window.setTimeout(cleanup, 1500);
  };

  document.body.appendChild(iframe);

  const frameDocument = iframe.contentDocument;

  if (!frameDocument) {
    cleanup();
    window.alert("Unable to prepare CV print view. Please try again.");
    return;
  }

  frameDocument.open();
  frameDocument.write(html);
  frameDocument.close();
};
