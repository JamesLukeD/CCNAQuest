import type { Section } from '../../../lib/types';

export const SECTION_WIRELESS_NETWORKING: Section = {
  id: 'wireless-networking',
  title: 'Wireless Networking Fundamentals',
  icon: '📶',
  unlockAfter: 'cloud-computing',
  lessons: [
    {
      id: 'l1',
      title: '802.11 Standards',
      icon: '📡',
      questions: [
        {
          type: 'teach',
          title: 'Wi-Fi Standards and Frequencies',
          body: '802.11 defines Wi-Fi standards. Key standards: 802.11a (5 GHz, 54 Mbps), 802.11b (2.4 GHz, 11 Mbps), 802.11g (2.4 GHz, 54 Mbps), 802.11n/Wi-Fi 4 (2.4/5 GHz, up to 600 Mbps, MIMO), 802.11ac/Wi-Fi 5 (5 GHz only, up to ~3.5 Gbps, MU-MIMO), 802.11ax/Wi-Fi 6 (2.4/5/6 GHz, OFDMA, higher capacity). Higher frequency = more speed but shorter range and less wall penetration.',
        },
        {
          type: 'mcq',
          question: 'Which 802.11 standard operates exclusively on the 5 GHz band and supports MU-MIMO?',
          choices: ['802.11n', '802.11g', '802.11ac', '802.11b'],
          answer: '802.11ac',
        },
        {
          type: 'mcq',
          question: 'Which Wi-Fi generation introduced OFDMA and improved efficiency in dense environments?',
          choices: ['Wi-Fi 4 (802.11n)', 'Wi-Fi 5 (802.11ac)', 'Wi-Fi 6 (802.11ax)', 'Wi-Fi 3 (802.11g)'],
          answer: 'Wi-Fi 6 (802.11ax)',
        },
        {
          type: 'tf',
          question: '802.11b and 802.11g both operate on the 2.4 GHz band.',
          answer: true,
          explanation: 'Both 802.11b (11 Mbps) and 802.11g (54 Mbps) operate on the 2.4 GHz band. They are backward-compatible — a g AP can communicate with b clients. 802.11a and 802.11ac operate only on 5 GHz.',
        },
        {
          type: 'mcq',
          question: 'Which 802.11 standard was the first to support both 2.4 GHz and 5 GHz using MIMO?',
          choices: ['802.11b', '802.11g', '802.11ac', '802.11n'],
          answer: '802.11n',
        },
        {
          type: 'fill',
          question: '802.11ac is also known as Wi-Fi _____.',
          answer: '5',
        },
        {
          type: 'tf',
          question: 'Higher frequency Wi-Fi signals (5 GHz) have greater range and wall penetration than 2.4 GHz signals.',
          answer: false,
          explanation: '2.4 GHz has better range and wall penetration than 5 GHz because lower frequency signals lose less energy passing through obstacles. 5 GHz provides higher throughput but in a smaller coverage area.',
        },
        {
          type: 'mcq',
          question: 'Which 802.11 standard first introduced MIMO (Multiple Input Multiple Output) antenna technology?',
          choices: ['802.11a', '802.11g', '802.11n', '802.11ac'],
          answer: '802.11n',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Channels and RF Concepts',
      icon: '📻',
      questions: [
        {
          type: 'teach',
          title: '2.4 GHz vs 5 GHz Channels',
          body: 'The 2.4 GHz band has 11 channels in North America, but only channels 1, 6, and 11 are non-overlapping. Overlapping channels cause co-channel interference, degrading performance. The 5 GHz band has many more non-overlapping channels (up to 24 in the US), making it better for high-density deployments. Deploy APs on channels 1, 6, or 11 in 2.4 GHz to avoid co-channel interference.',
        },
        {
          type: 'mcq',
          question: 'Which three 2.4 GHz channels are non-overlapping in North America?',
          choices: [
            '1, 5, 10',
            '1, 6, 11',
            '2, 7, 12',
            '1, 7, 13',
          ],
          answer: '1, 6, 11',
        },
        {
          type: 'tf',
          question: 'The 5 GHz band provides more non-overlapping channels than the 2.4 GHz band.',
          answer: true,
          explanation: 'The 5 GHz band has up to 24 non-overlapping 20 MHz channels in the US, compared to only 3 in the 2.4 GHz band. This makes 5 GHz far better for high-density deployments like offices or conference rooms.',
        },
        {
          type: 'mcq',
          question: 'What is the result of two APs in range of each other both using 2.4 GHz channel 6?',
          choices: [
            'They aggregate bandwidth',
            'Co-channel interference degrades performance',
            'They bond channels for higher throughput',
            'The newer AP takes priority',
          ],
          answer: 'Co-channel interference degrades performance',
        },
        {
          type: 'fill',
          question: 'Adjacent-channel interference occurs when two APs use _____ channels that partially overlap in frequency.',
          answer: 'overlapping',
        },
        {
          type: 'mcq',
          question: 'What is the maximum transmit power on a wireless network typically limited by?',
          choices: [
            'The AP manufacturer',
            'Regulatory (government) restrictions per country',
            'The client device capability only',
            'The Wi-Fi standard in use',
          ],
          answer: 'Regulatory (government) restrictions per country',
        },
        {
          type: 'tf',
          question: 'CSMA/CA is the access method used in 802.11 wireless networks to avoid collisions.',
          answer: true,
          explanation: 'Wi-Fi uses CSMA/CA (Carrier Sense Multiple Access / Collision Avoidance). Devices listen before transmitting and use random backoff timers to avoid simultaneous transmissions. This differs from wired Ethernet, which uses CSMA/CD.',
        },
        {
          type: 'mcq',
          question: 'What does SSID stand for?',
          choices: ['Subnet Service Identifier', 'Service Set Identifier', 'Switched Station ID', 'Secure Signal ID'],
          answer: 'Service Set Identifier',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Wireless Architecture',
      icon: '🏢',
      questions: [
        {
          type: 'teach',
          title: 'Autonomous vs Lightweight APs',
          body: 'Autonomous APs are self-contained — each is configured independently, suitable for small deployments. Lightweight APs (LWAP) offload intelligence to a Wireless LAN Controller (WLC) via CAPWAP (Control and Provisioning of Wireless Access Points) tunnels. The WLC centralises configuration, RF management, and roaming. A BSS (Basic Service Set) is one AP with its clients. An ESS (Extended Service Set) is multiple APs sharing the same SSID for seamless roaming.',
        },
        {
          type: 'mcq',
          question: 'Which protocol do lightweight APs use to communicate with a WLC?',
          choices: ['LWAPP', 'CAPWAP', 'GRE', 'VXLAN'],
          answer: 'CAPWAP',
        },
        {
          type: 'mcq',
          question: 'What is a BSS in wireless networking?',
          choices: [
            'A group of APs sharing the same SSID',
            'A single AP and its associated client devices',
            'A wireless bridge between two buildings',
            'A backup SSID for failover',
          ],
          answer: 'A single AP and its associated client devices',
        },
        {
          type: 'tf',
          question: 'An ESS (Extended Service Set) allows wireless clients to roam between multiple APs using the same SSID.',
          answer: true,
          explanation: 'An ESS connects multiple BSSs under the same SSID, enabling seamless roaming. When a client moves out of range of one AP, it reassociates with the next AP while keeping the same network identity.',
        },
        {
          type: 'mcq',
          question: 'Which device centralises the management of multiple lightweight APs?',
          choices: [
            'Autonomous AP',
            'Switch',
            'Wireless LAN Controller (WLC)',
            'RADIUS server',
          ],
          answer: 'Wireless LAN Controller (WLC)',
        },
        {
          type: 'fill',
          question: 'CAPWAP uses UDP ports 5246 (control) and _____ (data) for lightweight AP-to-WLC communication.',
          answer: '5247',
        },
        {
          type: 'tf',
          question: 'Autonomous APs require a WLC to operate.',
          answer: false,
          explanation: 'Autonomous APs contain all the intelligence needed to operate independently — they handle association, authentication, and RF management themselves. A WLC is only required for lightweight AP deployments.',
        },
        {
          type: 'mcq',
          question: 'In a WLC deployment, where is wireless client traffic typically switched onto the wired network?',
          choices: [
            'At the lightweight AP locally',
            'At the WLC after being tunnelled via CAPWAP',
            'At the RADIUS server',
            'At the gateway router',
          ],
          answer: 'At the WLC after being tunnelled via CAPWAP',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Wireless Security',
      icon: '🔒',
      questions: [
        {
          type: 'teach',
          title: 'WPA2 and WPA3',
          body: 'WEP (Wired Equivalent Privacy) is broken and must never be used. WPA2 uses AES-CCMP encryption and is the current baseline standard. WPA2-Personal uses a Pre-Shared Key (PSK); WPA2-Enterprise uses 802.1X with a RADIUS server for per-user authentication. WPA3 improves on WPA2 with SAE (Simultaneous Authentication of Equals) for stronger PSK protection and forward secrecy. WPA3-Enterprise uses 192-bit encryption.',
        },
        {
          type: 'mcq',
          question: 'Which encryption standard does WPA2 use?',
          choices: ['RC4/TKIP', 'DES', 'AES-CCMP', '3DES'],
          answer: 'AES-CCMP',
        },
        {
          type: 'mcq',
          question: 'Which WPA2 mode uses a RADIUS server for per-user authentication?',
          choices: ['WPA2-Personal', 'WPA2-PSK', 'WPA2-Enterprise', 'WPA2-SAE'],
          answer: 'WPA2-Enterprise',
        },
        {
          type: 'tf',
          question: 'WEP is still considered acceptable for securing legacy wireless devices.',
          answer: false,
          explanation: 'WEP (Wired Equivalent Privacy) was cracked in 2001 and can be broken in minutes with freely available tools. It must never be used. All modern wireless deployments should use at minimum WPA2.',
        },
        {
          type: 'mcq',
          question: 'Which WPA3 feature protects against offline dictionary attacks on the PSK?',
          choices: ['TKIP', 'AES-GCMP', 'SAE (Simultaneous Authentication of Equals)', 'CCMP'],
          answer: 'SAE (Simultaneous Authentication of Equals)',
        },
        {
          type: 'fill',
          question: 'WPA2-Personal uses a _____ (Pre-Shared Key) that all clients and the AP share.',
          answer: 'PSK',
        },
        {
          type: 'mcq',
          question: 'Which IEEE standard defines port-based network access control used in WPA2/WPA3-Enterprise?',
          choices: ['802.11ac', '802.1X', '802.1Q', '802.3af'],
          answer: '802.1X',
        },
        {
          type: 'tf',
          question: 'WPA3 provides forward secrecy, meaning captured traffic cannot be decrypted even if the PSK is later compromised.',
          answer: true,
          explanation: 'WPA3 uses SAE with Diffie-Hellman key exchange, generating unique session keys. Even if an attacker later obtains the PSK, previously captured encrypted traffic cannot be decrypted because session keys are never derived directly from the PSK.',
        },
        {
          type: 'mcq',
          question: 'What is the main disadvantage of WPA2-Personal in enterprise environments?',
          choices: [
            'It does not support AES encryption',
            'All users share the same PSK, making key management difficult',
            'It requires a RADIUS server',
            'It only works on 2.4 GHz',
          ],
          answer: 'All users share the same PSK, making key management difficult',
        },
      ],
    },
  ],
};
