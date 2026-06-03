import type { Section } from '../../../lib/types';

export const SECTION_TRANSPORT_LAYER: Section = {
  id: 'transport-layer',
  title: 'OSI Layer 4 – The Transport Layer',
  icon: '🚦',
  unlockAfter: 'cisco-ios',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – TCP vs UDP
    // ─────────────────────────────────────────────────────────
    {
      id: 's3l1',
      title: 'TCP vs UDP',
      icon: '⚖️',
      questions: [
        {
          type: 'teach',
          title: 'The Two Great Transport Spells',
          body: 'Layer 4 has two primary protocols — TCP and UDP. TCP (Transmission Control Protocol) is the reliable, connection-oriented spell: it guarantees every byte arrives, in order, and without corruption. UDP (User Datagram Protocol) is the fast, connectionless incantation: it fires data into the network with no guarantees, trusting the application to handle any losses.\n\nNeither is better — they serve different purposes.',
        },
        {
          type: 'teach',
          title: 'When to Use Each Protocol',
          body: 'Use TCP when accuracy matters more than speed: web browsing (HTTP/HTTPS), email (SMTP), file transfers (FTP), and SSH all use TCP. Use UDP when speed matters more than perfection: video streaming, VoIP, DNS queries, and TFTP all use UDP.\n\nA dropped video frame is barely noticeable. A dropped byte in a bank transfer is catastrophic — hence the split.',
        },
        {
          type: 'mcq',
          question: 'Which transport protocol is connection-oriented and guarantees delivery?',
          choices: ['UDP', 'TCP', 'ICMP', 'ARP'],
          answer: 'TCP',
        },
        {
          type: 'mcq',
          question: 'Which transport protocol is connectionless and provides no guaranteed delivery?',
          choices: ['TCP', 'FTP', 'UDP', 'SSH'],
          answer: 'UDP',
        },
        {
          type: 'tf',
          question: 'UDP performs error checking and retransmits lost data automatically.',
          answer: false,
          explanation: 'UDP is connectionless and does not retransmit lost data. It is the application\'s responsibility to handle any required error recovery.',
        },
        {
          type: 'mcq',
          question: 'Which application would most likely use UDP rather than TCP?',
          choices: ['File transfer (FTP)', 'Secure Shell (SSH)', 'Voice over IP (VoIP)', 'Web browsing (HTTPS)'],
          answer: 'Voice over IP (VoIP)',
        },
        {
          type: 'tf',
          question: 'TCP provides sequencing, which ensures data is reassembled in the correct order at the destination.',
          answer: true,
          explanation: 'TCP assigns sequence numbers to segments so the receiver can reorder them correctly, even if they arrive out of sequence.',
        },
        {
          type: 'fill',
          question: 'TCP stands for Transmission Control ________.',
          answer: 'Protocol',
        },
        {
          type: 'wordbank',
          question: 'Classify each protocol: drag each into the correct column (TCP uses these / UDP uses these):',
          bank: ['HTTP', 'DNS', 'FTP', 'TFTP', 'SSH', 'VoIP'],
          answer: ['HTTP', 'FTP', 'SSH', 'DNS', 'TFTP', 'VoIP'],
          explanation: 'TCP: HTTP, FTP, SSH. UDP: DNS (queries), TFTP, VoIP.',
        },
        {
          type: 'mcq',
          question: 'What is the primary advantage of UDP over TCP?',
          choices: [
            'UDP guarantees delivery',
            'UDP provides lower overhead and faster transmission',
            'UDP supports encryption by default',
            'UDP automatically retransmits lost segments',
          ],
          answer: 'UDP provides lower overhead and faster transmission',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – Port Numbers & Sockets
    // ─────────────────────────────────────────────────────────
    {
      id: 's3l2',
      title: 'Port Numbers & Sockets',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'The Address of an Application',
          body: 'An IP address identifies a host on the network. A port number identifies the specific application or service running on that host. Together, the IP address and port number form a socket — the precise delivery address for any piece of data on the internet.\n\nFor example: 192.168.1.1:80 means "the web server application on host 192.168.1.1".',
        },
        {
          type: 'teach',
          title: 'Port Number Ranges',
          body: 'Port numbers run from 0 to 65,535. They are split into three ranges:\n\n0–1023 — Well-Known Ports: reserved for standard services (HTTP=80, HTTPS=443, SSH=22, DNS=53).\n1024–49151 — Registered Ports: vendor-registered applications.\n49152–65535 — Dynamic/Ephemeral Ports: assigned temporarily by the OS to client-side connections.\n\nThe CCNA exam expects you to know the well-known ports by heart.',
        },
        {
          type: 'mcq',
          question: 'Which port number does HTTPS use?',
          choices: ['80', '22', '443', '8080'],
          answer: '443',
        },
        {
          type: 'mcq',
          question: 'Which port number does SSH use?',
          choices: ['21', '22', '23', '25'],
          answer: '22',
        },
        {
          type: 'mcq',
          question: 'Which port number does DNS use?',
          choices: ['53', '67', '80', '161'],
          answer: '53',
        },
        {
          type: 'tf',
          question: 'Port numbers range from 0 to 65,535.',
          answer: true,
          explanation: 'TCP and UDP use 16-bit port number fields, giving a range of 0 to 65,535.',
        },
        {
          type: 'fill',
          question: 'Well-known port numbers range from 0 to ________.',
          answer: '1023',
        },
        {
          type: 'mcq',
          question: 'Which port does Telnet use?',
          choices: ['22', '23', '25', '80'],
          answer: '23',
        },
        {
          type: 'mcq',
          question: 'What is the dynamic/ephemeral port range as defined by IANA?',
          choices: ['0–1023', '1024–49151', '49152–65535', '32768–60999'],
          answer: '49152–65535',
        },
        {
          type: 'wordbank',
          question: 'Match each service to its well-known port number:',
          bank: ['80', '443', '22', '53', '25', '21'],
          answer: ['80', '443', '22', '53', '25', '21'],
          explanation: 'HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25, FTP=21.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – The Three-Way Handshake
    // ─────────────────────────────────────────────────────────
    {
      id: 's3l3',
      title: 'The Three-Way Handshake',
      icon: '🤝',
      questions: [
        {
          type: 'teach',
          title: 'Casting the Connection Spell',
          body: 'Before TCP can send a single byte of real data, it must first establish a connection using the three-way handshake. The three steps are:\n\n1. SYN — The client sends a segment with the SYN flag set, saying "I want to connect and here is my starting sequence number."\n2. SYN-ACK — The server replies with both SYN and ACK flags set: "I accept your connection and here is my starting sequence number."\n3. ACK — The client acknowledges the server\'s SYN. The connection is now open.\n\nOnly after this ritual can data flow.',
        },
        {
          type: 'teach',
          title: 'Closing the Connection',
          body: 'TCP closes gracefully using a four-step process: FIN → ACK → FIN → ACK. Either side can initiate closure. This ensures both sides have finished sending before the connection is torn down.\n\nThere is also a reset (RST) flag — used to abruptly terminate a connection when something goes wrong. RST is the emergency kill switch.',
        },
        {
          type: 'mcq',
          question: 'What is the correct sequence of flags in a TCP three-way handshake?',
          choices: [
            'SYN → ACK → SYN-ACK',
            'SYN → SYN-ACK → ACK',
            'ACK → SYN → SYN-ACK',
            'SYN-ACK → SYN → ACK',
          ],
          answer: 'SYN → SYN-ACK → ACK',
        },
        {
          type: 'tf',
          question: 'The TCP three-way handshake is initiated by the server.',
          answer: false,
          explanation: 'The client initiates the TCP three-way handshake by sending the first SYN segment to the server.',
        },
        {
          type: 'fill',
          question: 'The first step of the TCP three-way handshake involves the client sending a segment with the ________ flag set.',
          answer: 'SYN',
        },
        {
          type: 'mcq',
          question: 'How many steps are in a TCP connection termination (graceful close)?',
          choices: ['2', '3', '4', '6'],
          answer: '4',
        },
        {
          type: 'tf',
          question: 'UDP uses a three-way handshake before transmitting data.',
          answer: false,
          explanation: 'UDP is connectionless — it sends data without establishing a connection first. Only TCP uses the three-way handshake.',
        },
        {
          type: 'mcq',
          question: 'Which TCP flag is used to abruptly terminate a connection?',
          choices: ['FIN', 'SYN', 'ACK', 'RST'],
          answer: 'RST',
        },
        {
          type: 'mcq',
          question: 'During the TCP three-way handshake, what does the server\'s SYN-ACK segment accomplish?',
          choices: [
            'It terminates the connection',
            'It acknowledges the client\'s SYN and sends the server\'s own SYN',
            'It sends the first data payload',
            'It assigns a port number to the client',
          ],
          answer: 'It acknowledges the client\'s SYN and sends the server\'s own SYN',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Flow Control & Windowing
    // ─────────────────────────────────────────────────────────
    {
      id: 's3l4',
      title: 'Flow Control & Windowing',
      icon: '🪟',
      questions: [
        {
          type: 'teach',
          title: 'Managing the Flood',
          body: 'Imagine a fast sender blasting data at a slow receiver — the receiver\'s buffer overflows and data is lost. TCP prevents this with flow control: the receiver advertises a window size in every ACK, telling the sender how many bytes it is willing to accept before the next acknowledgement.\n\nIf the receiver\'s buffer fills up, it advertises a window size of 0, pausing the sender entirely.',
        },
        {
          type: 'teach',
          title: 'The Sliding Window',
          body: 'TCP uses a sliding window mechanism. The sender can have multiple unacknowledged segments "in flight" at once — up to the window size. As ACKs arrive, the window slides forward, allowing new data to be sent.\n\nA larger window = higher throughput (more data in flight at once). A smaller window = lower throughput but less risk of overwhelming the receiver. TCP dynamically adjusts the window size throughout the connection.',
        },
        {
          type: 'mcq',
          question: 'What mechanism does TCP use to prevent the sender from overwhelming the receiver?',
          choices: ['Congestion control', 'Flow control', 'Segmentation', 'Multiplexing'],
          answer: 'Flow control',
        },
        {
          type: 'tf',
          question: 'A larger TCP window size allows more data to be sent before an acknowledgement is required.',
          answer: true,
          explanation: 'The window size defines how many bytes the sender can transmit before waiting for an ACK. A larger window allows more data in flight, increasing throughput.',
        },
        {
          type: 'fill',
          question: 'TCP uses a ________ window mechanism that advances as acknowledgements are received.',
          answer: 'sliding',
        },
        {
          type: 'mcq',
          question: 'What does a TCP receiver advertise when its buffer is full?',
          choices: [
            'A window size of 65535',
            'A window size of 0',
            'A RST flag',
            'A FIN flag',
          ],
          answer: 'A window size of 0',
        },
        {
          type: 'mcq',
          question: 'Where is the TCP window size field located?',
          choices: ['IP header', 'Ethernet frame header', 'TCP header', 'UDP header'],
          answer: 'TCP header',
        },
        {
          type: 'tf',
          question: 'Flow control in TCP is a function of the Transport layer (Layer 4).',
          answer: true,
          explanation: 'Flow control — managing the rate of data transmission between sender and receiver — is a core Transport layer (Layer 4) function.',
        },
        {
          type: 'mcq',
          question: 'What is the effect of reducing the TCP window size?',
          choices: [
            'More data can be sent before waiting for an ACK',
            'Less data can be sent before waiting for an ACK',
            'The connection becomes connectionless',
            'Retransmission is disabled',
          ],
          answer: 'Less data can be sent before waiting for an ACK',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's3l5',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Which protocol provides reliable, ordered, and error-checked delivery of a stream of bytes?',
          choices: ['UDP', 'ICMP', 'TCP', 'ARP'],
          answer: 'TCP',
        },
        {
          type: 'mcq',
          question: 'Which well-known port does HTTP use?',
          choices: ['21', '22', '80', '443'],
          answer: '80',
        },
        {
          type: 'tf',
          question: 'The correct order of the TCP three-way handshake is SYN, SYN-ACK, ACK.',
          answer: true,
          explanation: 'SYN (client) → SYN-ACK (server) → ACK (client) is the correct three-way handshake sequence.',
        },
        {
          type: 'mcq',
          question: 'Which transport protocol would you choose to minimise latency for a live video stream?',
          choices: ['TCP', 'FTP', 'UDP', 'SMTP'],
          answer: 'UDP',
        },
        {
          type: 'fill',
          question: 'A TCP socket is the combination of an IP address and a ________ number.',
          answer: 'port',
        },
        {
          type: 'mcq',
          question: 'What is the range of well-known port numbers?',
          choices: ['0–1023', '1024–49151', '0–65535', '49152–65535'],
          answer: '0–1023',
        },
        {
          type: 'tf',
          question: 'When a TCP receiver\'s buffer is full, it advertises a window size of 0 to pause the sender.',
          answer: true,
          explanation: 'A window size of 0 signals the sender to stop transmitting until the receiver advertises a non-zero window.',
        },
        {
          type: 'mcq',
          question: 'Which port does TFTP use, and which transport protocol does it run over?',
          choices: [
            'Port 20, TCP',
            'Port 69, UDP',
            'Port 21, TCP',
            'Port 69, TCP',
          ],
          answer: 'Port 69, UDP',
        },
        {
          type: 'wordbank',
          question: 'Complete the three-way handshake sequence in order:',
          bank: ['ACK', 'SYN-ACK', 'SYN'],
          answer: ['SYN', 'SYN-ACK', 'ACK'],
        },
        {
          type: 'mcq',
          question: 'Which TCP flag is sent by the client in the final step of the three-way handshake?',
          choices: ['SYN', 'SYN-ACK', 'ACK', 'FIN'],
          answer: 'ACK',
        },
      ],
    },
  ],
};
