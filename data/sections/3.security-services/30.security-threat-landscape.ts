import type { Section } from '../../../lib/types';

export const SECTION_SECURITY_THREAT_LANDSCAPE: Section = {
  id: 'security-threat-landscape',
  title: 'The Security Threat Landscape',
  icon: '☠️',
  unlockAfter: 'wan',
  lessons: [
    {
      id: 'l1',
      title: 'Malware and Attack Types',
      icon: '🦠',
      questions: [
        {
          type: 'teach',
          title: 'Common Malware Categories',
          body: 'Malware (malicious software) comes in several forms: Virus — attaches to legitimate programs and spreads when executed. Worm — self-replicates across networks without user interaction. Trojan — disguises itself as legitimate software. Ransomware — encrypts victim files and demands payment. Spyware — secretly collects user data. Adware — displays unwanted advertisements. Rootkit — hides malware at the OS/kernel level.',
        },
        {
          type: 'mcq',
          question: 'Which malware type self-replicates across a network without requiring a host file or user action?',
          choices: ['Virus', 'Worm', 'Trojan', 'Spyware'],
          answer: 'Worm',
        },
        {
          type: 'mcq',
          question: 'What does ransomware do to a victim\'s system?',
          choices: [
            'Logs keystrokes and sends them to an attacker',
            'Encrypts files and demands payment for the decryption key',
            'Displays unwanted advertisements',
            'Hides itself at the kernel level',
          ],
          answer: 'Encrypts files and demands payment for the decryption key',
        },
        {
          type: 'tf',
          question: 'A Trojan horse malware disguises itself as a legitimate, useful program.',
          answer: true,
          explanation: 'Trojans appear legitimate to trick users into installing them. Once executed, they deliver a malicious payload such as backdoor access, credential theft, or downloading additional malware.',
        },
        {
          type: 'mcq',
          question: 'Which malware type attaches itself to legitimate files and requires a user to execute the infected file to spread?',
          choices: ['Worm', 'Ransomware', 'Virus', 'Rootkit'],
          answer: 'Virus',
        },
        {
          type: 'fill',
          question: 'Malware that hides itself at the OS kernel level to avoid detection is called a _____.',
          answer: 'rootkit',
        },
        {
          type: 'tf',
          question: 'Spyware is primarily designed to encrypt the victim\'s data.',
          answer: false,
          explanation: 'Spyware secretly monitors and collects user data — browsing history, credentials, keystrokes — without the user\'s knowledge. Data encryption is the goal of ransomware, not spyware.',
        },
        {
          type: 'mcq',
          question: 'A network is experiencing slow performance and high CPU on all hosts. Thousands of connections are flooding a server. Which attack is most likely?',
          choices: ['Phishing', 'DoS/DDoS', 'Man-in-the-middle', 'SQL injection'],
          answer: 'DoS/DDoS',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Social Engineering',
      icon: '🎭',
      questions: [
        {
          type: 'teach',
          title: 'Phishing and Social Engineering',
          body: 'Social engineering manipulates people rather than exploiting technical vulnerabilities. Phishing — deceptive emails/websites tricking users into revealing credentials. Spear phishing — targeted phishing at specific individuals. Whaling — spear phishing targeting executives. Vishing — voice/phone phishing. Smishing — SMS phishing. Pretexting — fabricating a scenario (e.g. impersonating IT support) to extract information. Baiting — leaving infected USB drives for victims to find.',
        },
        {
          type: 'mcq',
          question: 'Which type of phishing targets a specific individual or organisation with personalised lures?',
          choices: ['Whaling', 'Spear phishing', 'Vishing', 'Smishing'],
          answer: 'Spear phishing',
        },
        {
          type: 'mcq',
          question: 'Which social engineering technique uses phone calls to deceive victims?',
          choices: ['Phishing', 'Smishing', 'Vishing', 'Pretexting'],
          answer: 'Vishing',
        },
        {
          type: 'tf',
          question: 'Whaling is a phishing attack specifically targeting senior executives.',
          answer: true,
          explanation: 'Whaling targets high-value individuals such as C-suite executives, board members, or senior managers. These attacks are highly personalised and often more convincing than generic phishing emails.',
        },
        {
          type: 'mcq',
          question: 'An attacker leaves infected USB drives in a car park hoping employees will plug them in. This is called:',
          choices: ['Pretexting', 'Baiting', 'Vishing', 'Tailgating'],
          answer: 'Baiting',
        },
        {
          type: 'fill',
          question: 'Phishing attacks sent via SMS text message are called _____.',
          answer: 'smishing',
        },
        {
          type: 'tf',
          question: 'Social engineering primarily exploits technical software vulnerabilities.',
          answer: false,
          explanation: 'Social engineering exploits human psychology — trust, fear, urgency, and authority — rather than technical flaws. It is often the easiest attack vector because humans are generally the weakest link in security.',
        },
        {
          type: 'mcq',
          question: 'Which attack involves an attacker fabricating a believable scenario to convince a victim to reveal sensitive information?',
          choices: ['Baiting', 'Pretexting', 'Phishing', 'Tailgating'],
          answer: 'Pretexting',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Network Attacks',
      icon: '💥',
      questions: [
        {
          type: 'teach',
          title: 'DoS, DDoS, and MITM',
          body: 'Denial of Service (DoS) overwhelms a target with traffic from a single source. Distributed DoS (DDoS) uses a botnet of thousands of compromised machines simultaneously. Man-in-the-Middle (MITM) positions the attacker between two communicating parties to intercept or modify traffic — enabled by ARP spoofing, DNS poisoning, or rogue Wi-Fi APs. Reconnaissance attacks (port scanning, network mapping) gather information before launching targeted attacks.',
        },
        {
          type: 'mcq',
          question: 'What makes DDoS attacks more difficult to mitigate than simple DoS attacks?',
          choices: [
            'DDoS uses stronger encryption',
            'DDoS originates from thousands of sources simultaneously',
            'DDoS targets the physical layer',
            'DDoS requires physical access to the network',
          ],
          answer: 'DDoS originates from thousands of sources simultaneously',
        },
        {
          type: 'mcq',
          question: 'Which attack allows an attacker to intercept traffic between two hosts by sending false ARP replies?',
          choices: ['DoS', 'Man-in-the-Middle via ARP spoofing', 'DNS amplification', 'SYN flood'],
          answer: 'Man-in-the-Middle via ARP spoofing',
        },
        {
          type: 'tf',
          question: 'A SYN flood attack exploits the TCP three-way handshake by sending many SYN packets without completing the handshake.',
          answer: true,
          explanation: 'A SYN flood sends many TCP SYN requests with spoofed source IPs. The server allocates resources for each half-open connection and waits for the final ACK that never comes, eventually exhausting its connection table.',
        },
        {
          type: 'mcq',
          question: 'What is a botnet?',
          choices: [
            'A network of dedicated security appliances',
            'A collection of compromised devices controlled by an attacker',
            'A type of VPN used for anonymity',
            'A network of honeypot servers',
          ],
          answer: 'A collection of compromised devices controlled by an attacker',
        },
        {
          type: 'fill',
          question: 'Reconnaissance techniques like port scanning and network mapping are performed before an attack to _____ information about the target.',
          answer: 'gather',
        },
        {
          type: 'tf',
          question: 'DNS poisoning can be used to enable a man-in-the-middle attack by redirecting users to a malicious server.',
          answer: true,
          explanation: 'DNS poisoning corrupts a DNS resolver\'s cache with false records, redirecting users to attacker-controlled servers. Combined with a valid-looking fake site, this enables credential theft and MITM attacks.',
        },
        {
          type: 'mcq',
          question: 'Which type of attack overwhelms a server by sending packets with invalid or random source IP addresses?',
          choices: ['Phishing', 'IP spoofing DoS', 'ARP spoofing', 'Session hijacking'],
          answer: 'IP spoofing DoS',
        },
      ],
    },
    {
      id: 'l4',
      title: 'CIA Triad and Security Principles',
      icon: '🔒',
      questions: [
        {
          type: 'teach',
          title: 'The CIA Triad',
          body: 'The CIA triad defines the three core security goals: Confidentiality — only authorised users can access data (achieved via encryption, ACLs). Integrity — data has not been tampered with (achieved via hashing, digital signatures). Availability — systems and data are accessible when needed (achieved via redundancy, DDoS protection, backups). All security controls can be mapped to one or more of these principles.',
        },
        {
          type: 'mcq',
          question: 'Which element of the CIA triad ensures that data has not been modified in transit?',
          choices: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
          answer: 'Integrity',
        },
        {
          type: 'mcq',
          question: 'Encrypting data in transit primarily addresses which CIA triad element?',
          choices: ['Integrity', 'Availability', 'Confidentiality', 'Non-repudiation'],
          answer: 'Confidentiality',
        },
        {
          type: 'tf',
          question: 'A DDoS attack primarily targets the Availability element of the CIA triad.',
          answer: true,
          explanation: 'DDoS attacks aim to make systems unavailable by overwhelming resources, directly attacking Availability. Confidentiality and Integrity are not the primary targets of DDoS (though the attack may be used as a diversion).',
        },
        {
          type: 'mcq',
          question: 'Which control best addresses the Integrity element of the CIA triad?',
          choices: [
            'Firewall rules',
            'Hashing and digital signatures',
            'Redundant power supplies',
            'Strong password policies',
          ],
          answer: 'Hashing and digital signatures',
        },
        {
          type: 'fill',
          question: 'The three elements of the CIA triad are Confidentiality, Integrity, and _____.',
          answer: 'Availability',
        },
        {
          type: 'mcq',
          question: 'What does the principle of least privilege mean?',
          choices: [
            'Users should have the minimum access rights needed to perform their job',
            'Passwords should be as short as possible',
            'Security controls should be as few as possible',
            'Privileged accounts should be shared among administrators',
          ],
          answer: 'Users should have the minimum access rights needed to perform their job',
        },
        {
          type: 'tf',
          question: 'Defence in depth means relying on a single strong security control rather than multiple layered controls.',
          answer: false,
          explanation: 'Defence in depth is the strategy of using multiple, overlapping security controls (firewalls, IPS, ACLs, endpoint security, etc.) so that if one layer fails, others still protect the asset.',
        },
        {
          type: 'mcq',
          question: 'Which term describes a known weakness in a system that can be exploited by an attacker?',
          choices: ['Threat', 'Vulnerability', 'Risk', 'Exploit'],
          answer: 'Vulnerability',
        },
      ],
    },
  ],
};
