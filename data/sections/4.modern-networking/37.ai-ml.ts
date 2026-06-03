import type { Section } from '../../../lib/types';

export const SECTION_AI_ML: Section = {
  id: 'ai-ml',
  title: 'AI – Artificial Intelligence and ML',
  icon: '🧠',
  unlockAfter: 'network-automation',
  lessons: [
    {
      id: 'l1',
      title: 'AI and ML Fundamentals',
      icon: '📊',
      questions: [
        {
          type: 'teach',
          title: 'Machine Learning Categories',
          body: 'Artificial Intelligence (AI) enables machines to perform tasks that typically require human intelligence. Machine Learning (ML) is a subset of AI where systems learn from data rather than being explicitly programmed. Three ML categories: Supervised learning — trained on labelled data to predict outcomes (spam filtering). Unsupervised learning — finds hidden patterns in unlabelled data (anomaly detection). Reinforcement learning — learns by trial and error with rewards (network path optimisation).',
        },
        {
          type: 'mcq',
          question: 'Which ML category trains a model using labelled input-output pairs?',
          choices: ['Unsupervised learning', 'Reinforcement learning', 'Supervised learning', 'Deep learning'],
          answer: 'Supervised learning',
        },
        {
          type: 'mcq',
          question: 'Which ML category discovers hidden patterns in data without labelled examples?',
          choices: ['Supervised learning', 'Reinforcement learning', 'Unsupervised learning', 'Transfer learning'],
          answer: 'Unsupervised learning',
        },
        {
          type: 'tf',
          question: 'Machine learning is a subset of artificial intelligence.',
          answer: true,
          explanation: 'The hierarchy is: AI (broadest) → Machine Learning → Deep Learning (narrowest). AI includes any technique enabling machines to mimic human intelligence. ML specifically uses statistical models that improve through experience with data.',
        },
        {
          type: 'mcq',
          question: 'Which ML category learns by taking actions in an environment and receiving feedback (rewards or penalties)?',
          choices: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Semi-supervised learning'],
          answer: 'Reinforcement learning',
        },
        {
          type: 'fill',
          question: 'Deep learning is a subset of machine learning that uses multi-layered artificial _____ networks.',
          answer: 'neural',
        },
        {
          type: 'tf',
          question: 'Spam email filtering is an example of supervised machine learning.',
          answer: true,
          explanation: 'Spam filters are trained on labelled datasets of spam and non-spam emails. The model learns features that distinguish spam, then classifies new emails. This is supervised learning — training with labelled examples.',
        },
        {
          type: 'mcq',
          question: 'Which describes a key difference between traditional programming and machine learning?',
          choices: [
            'ML requires more hardware than traditional programming',
            'ML learns rules from data; traditional programming requires explicit rules',
            'Traditional programming is faster than ML at all tasks',
            'ML cannot handle large datasets',
          ],
          answer: 'ML learns rules from data; traditional programming requires explicit rules',
        },
      ],
    },
    {
      id: 'l2',
      title: 'AI in Network Operations',
      icon: '🔧',
      questions: [
        {
          type: 'teach',
          title: 'AI-Driven Networking Use Cases',
          body: 'AI transforms network operations by automating tasks that previously required human expertise. Key use cases: Anomaly detection — ML baselines normal traffic and alerts on deviations. Predictive analytics — forecast failures before they occur (CPU trends, link utilisation). Root cause analysis — correlate events to identify the source of problems faster. AIOps platforms (like Cisco Crosswork) ingest telemetry data and apply ML to provide actionable insights.',
        },
        {
          type: 'mcq',
          question: 'Which AI networking use case detects unusual traffic patterns that differ from a learned baseline?',
          choices: [
            'Predictive analytics',
            'Network automation',
            'Anomaly detection',
            'Configuration management',
          ],
          answer: 'Anomaly detection',
        },
        {
          type: 'mcq',
          question: 'Which AI use case forecasts hardware failures or link saturation before they cause outages?',
          choices: [
            'Anomaly detection',
            'Predictive analytics',
            'Root cause analysis',
            'Policy enforcement',
          ],
          answer: 'Predictive analytics',
        },
        {
          type: 'tf',
          question: 'AIOps applies AI and ML to IT operations data to automate issue detection and remediation.',
          answer: true,
          explanation: 'AIOps (Artificial Intelligence for IT Operations) ingests large volumes of telemetry (logs, metrics, events) and uses ML to correlate data, detect anomalies, and in some cases automatically remediate issues — reducing mean time to resolution (MTTR).',
        },
        {
          type: 'mcq',
          question: 'Cisco Crosswork is an example of which type of platform?',
          choices: ['SDN controller', 'AIOps / network analytics platform', 'Wireless LAN controller', 'Cloud firewall'],
          answer: 'AIOps / network analytics platform',
        },
        {
          type: 'fill',
          question: 'AI-based _____ analysis correlates multiple events to identify the underlying cause of a network problem.',
          answer: 'root cause',
        },
        {
          type: 'tf',
          question: 'Network telemetry streaming (gRPC/model-driven telemetry) provides richer, real-time data for AI analytics than SNMP polling.',
          answer: true,
          explanation: 'Model-driven telemetry pushes data from devices to collectors at high frequency using gRPC/YANG models. SNMP polling is periodic and slower. Richer, real-time data improves the accuracy and responsiveness of AI-based network analytics.',
        },
        {
          type: 'mcq',
          question: 'Which term describes reducing the mean time to identify and fix a network problem?',
          choices: ['MTBF', 'MTTR', 'SLA', 'RTO'],
          answer: 'MTTR',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Intent-Based Networking',
      icon: '🎯',
      questions: [
        {
          type: 'teach',
          title: 'Intent-Based Networking (IBN)',
          body: 'Intent-Based Networking (IBN) allows operators to define WHAT the network should do (business intent) rather than HOW to configure each device. The IBN system translates intent into device configurations, continuously validates that the network matches the intent, and remediates deviations automatically. Cisco DNA Center implements IBN for campus networks — policies are defined once and applied consistently across all devices.',
        },
        {
          type: 'mcq',
          question: 'What is the core idea of Intent-Based Networking (IBN)?',
          choices: [
            'Configuring each device with detailed CLI commands',
            'Expressing desired outcomes and letting the system handle configuration',
            'Replacing physical routers with virtual appliances',
            'Using AI to monitor traffic patterns only',
          ],
          answer: 'Expressing desired outcomes and letting the system handle configuration',
        },
        {
          type: 'mcq',
          question: 'Which Cisco product implements IBN for enterprise campus networks?',
          choices: ['Cisco vManage', 'Cisco ACI', 'Cisco DNA Center', 'Cisco ISE'],
          answer: 'Cisco DNA Center',
        },
        {
          type: 'tf',
          question: 'IBN systems continuously verify that the current network state matches the desired intent and can auto-remediate deviations.',
          answer: true,
          explanation: 'A key pillar of IBN is closed-loop assurance: the system continuously monitors the network, compares the actual state to the defined intent, and automatically corrects misconfigurations or alerts operators when deviations cannot be auto-remediated.',
        },
        {
          type: 'mcq',
          question: 'Which IBN capability translates high-level business policies into device-level configurations automatically?',
          choices: [
            'Southbound API polling',
            'Intent translation and activation',
            'Manual CLI scripting',
            'SNMP MIB updates',
          ],
          answer: 'Intent translation and activation',
        },
        {
          type: 'fill',
          question: 'IBN focuses on defining _____ the network should achieve, not the low-level CLI commands to implement it.',
          answer: 'what',
        },
        {
          type: 'tf',
          question: 'Cisco ACI (Application Centric Infrastructure) applies IBN concepts to data centre networks.',
          answer: true,
          explanation: 'Cisco ACI implements policy-based networking for data centres. Administrators define application policies (which application groups can communicate) and ACI programs the underlying fabric automatically — the same intent-based paradigm as DNA Center, but for the data centre.',
        },
        {
          type: 'mcq',
          question: 'What is the term for the IBN feedback loop that monitors the network and corrects deviations from intent?',
          choices: [
            'Open-loop control',
            'Closed-loop assurance',
            'Reactive monitoring',
            'Manual reconciliation',
          ],
          answer: 'Closed-loop assurance',
        },
      ],
    },
    {
      id: 'l4',
      title: 'AI for Security',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'AI-Driven Security',
          body: 'AI enhances network security by analysing vast amounts of data at speeds impossible for humans. Threat detection: ML identifies malware signatures and zero-day attacks by analysing behaviour rather than signatures. Behavioural analysis: baseline normal user/device behaviour and flag anomalies (insider threats, compromised accounts). Automated response: SOAR (Security Orchestration, Automation, and Response) platforms auto-contain threats. Cisco SecureX and Darktrace are examples.',
        },
        {
          type: 'mcq',
          question: 'Which AI security technique establishes a baseline of normal behaviour and flags deviations?',
          choices: [
            'Signature-based detection',
            'Behavioural analysis',
            'Firewall rule matching',
            'Port scanning',
          ],
          answer: 'Behavioural analysis',
        },
        {
          type: 'mcq',
          question: 'What does SOAR stand for in the context of AI-driven security?',
          choices: [
            'Security Operations and Risk Assessment',
            'Security Orchestration, Automation, and Response',
            'Software-Oriented Architecture and Routing',
            'Secure Operations and Analytics Review',
          ],
          answer: 'Security Orchestration, Automation, and Response',
        },
        {
          type: 'tf',
          question: 'AI-based threat detection can identify zero-day attacks that signature-based tools miss.',
          answer: true,
          explanation: 'Signature-based tools only detect known threats. AI/ML models analyse behaviour, network traffic patterns, and anomalies, enabling detection of novel attacks that have no known signature — a critical advantage as new malware variants emerge daily.',
        },
        {
          type: 'mcq',
          question: 'Which AI technique is used to detect malware by analysing its behaviour rather than matching a known signature?',
          choices: [
            'Signature scanning',
            'Pattern matching',
            'Behavioural / heuristic analysis',
            'Port-based filtering',
          ],
          answer: 'Behavioural / heuristic analysis',
        },
        {
          type: 'fill',
          question: 'AI platforms that automatically contain threats without human intervention use _____ response capabilities.',
          answer: 'automated',
        },
        {
          type: 'tf',
          question: 'Machine learning models for security improve over time as they are exposed to more threat data.',
          answer: true,
          explanation: 'ML security models retrain on new threat data continuously, improving their ability to detect emerging attack patterns. This gives AI-based security tools a significant advantage over static signature databases that require manual updates.',
        },
        {
          type: 'mcq',
          question: 'Which concept describes AI reducing the time between initial compromise and detection of a breach?',
          choices: [
            'Mean Time to Repair (MTTR)',
            'Mean Time to Detect (MTTD)',
            'Recovery Time Objective (RTO)',
            'Service Level Agreement (SLA)',
          ],
          answer: 'Mean Time to Detect (MTTD)',
        },
        {
          type: 'mcq',
          question: 'Which Cisco platform integrates security products and uses AI for threat detection and response?',
          choices: ['Cisco DNA Center', 'Cisco Crosswork', 'Cisco SecureX', 'Cisco vManage'],
          answer: 'Cisco SecureX',
        },
      ],
    },
  ],
};
