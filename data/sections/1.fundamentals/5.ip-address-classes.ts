import type { Section } from '../../../lib/types';

export const SECTION_IP_ADDRESS_CLASSES: Section = {
  id: 'ip-address-classes',
  title: 'IP Address Classes',
  icon: '🔢',
  unlockAfter: 'network-layer',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Class A, B & C
    // ─────────────────────────────────────────────────────────
    {
      id: 's5l1',
      title: 'Class A, B & C',
      icon: '📊',
      questions: [
        {
          type: 'teach',
          title: 'The Three Tiers of the Address Realm',
          body: 'IPv4 addresses are 32 bits long and were originally divided into classes based on the value of the first octet. The three usable unicast classes are:\n\nClass A — First octet 1–126. Default mask /8. Designed for massive networks (16 million hosts per network).\nClass B — First octet 128–191. Default mask /16. Designed for medium networks (65,534 hosts per network).\nClass C — First octet 192–223. Default mask /24. Designed for small networks (254 hosts per network).',
        },
        {
          type: 'teach',
          title: 'How to Identify the Class',
          body: 'You can identify any address class from the first octet alone:\n\n1–126 → Class A\n128–191 → Class B\n192–223 → Class C\n224–239 → Class D (Multicast)\n240–255 → Class E (Experimental)\n\nNote: 127.x.x.x is reserved for loopback and is NOT a usable Class A range. The exam will test this distinction.',
        },
        {
          type: 'mcq',
          question: 'What is the default subnet mask for a Class B address?',
          choices: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.128'],
          answer: '255.255.0.0',
        },
        {
          type: 'mcq',
          question: 'Which class does the IP address 172.16.5.10 belong to?',
          choices: ['Class A', 'Class B', 'Class C', 'Class D'],
          answer: 'Class B',
        },
        {
          type: 'mcq',
          question: 'Which class does the IP address 10.0.0.1 belong to?',
          choices: ['Class A', 'Class B', 'Class C', 'Class D'],
          answer: 'Class A',
        },
        {
          type: 'mcq',
          question: 'Which class does the IP address 192.168.1.1 belong to?',
          choices: ['Class A', 'Class B', 'Class C', 'Class D'],
          answer: 'Class C',
        },
        {
          type: 'tf',
          question: 'The 127.0.0.0/8 range is a valid, usable Class A network range.',
          answer: false,
          explanation: 'The 127.0.0.0/8 range is reserved for loopback testing and cannot be assigned to hosts. 127.0.0.1 is the standard loopback address.',
        },
        {
          type: 'fill',
          question: 'The default subnet mask for a Class C network is 255.255.255.________.',
          answer: '0',
        },
        {
          type: 'mcq',
          question: 'How many usable host addresses does a Class C network support by default?',
          choices: ['256', '254', '255', '512'],
          answer: '254',
          explanation: 'A /24 network has 256 addresses. Subtract the network address (all 0s) and broadcast address (all 1s) = 254 usable hosts.',
        },
        {
          type: 'wordbank',
          question: 'Match each class to its first-octet range:',
          bank: ['Class A', 'Class B', 'Class C', '1–126', '128–191', '192–223'],
          answer: ['Class A', '1–126', 'Class B', '128–191', 'Class C', '192–223'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – Class D, E & Special Addresses
    // ─────────────────────────────────────────────────────────
    {
      id: 's5l2',
      title: 'Class D, E & Special Addresses',
      icon: '✨',
      questions: [
        {
          type: 'teach',
          title: 'Beyond Unicast — Class D and E',
          body: 'Class D (224.0.0.0–239.255.255.255) is reserved for multicast — sending one packet to a group of interested receivers simultaneously. Multicast is used by routing protocols (OSPF uses 224.0.0.5), video streaming, and IPTV.\n\nClass E (240.0.0.0–255.255.255.255) is reserved for experimental use and is never assigned to hosts. You will not see Class E in production networks.',
        },
        {
          type: 'teach',
          title: 'Reserved Special Addresses',
          body: 'Several address ranges are reserved for special purposes:\n\n127.0.0.1 — Loopback. Tests the local TCP/IP stack without sending traffic onto the network. "Can my NIC talk to itself?"\n169.254.0.0/16 — APIPA (Automatic Private IP Addressing). Assigned automatically when a host cannot reach a DHCP server. Seeing a 169.254.x.x address always means a DHCP failure.\n255.255.255.255 — Limited broadcast. Sent to all hosts on the local network; not forwarded by routers.',
        },
        {
          type: 'mcq',
          question: 'Which address class is used for multicast traffic?',
          choices: ['Class B', 'Class C', 'Class D', 'Class E'],
          answer: 'Class D',
        },
        {
          type: 'mcq',
          question: 'What does the IP address 127.0.0.1 represent?',
          choices: [
            'The default gateway',
            'A Class A private address',
            'The loopback address',
            'An APIPA address',
          ],
          answer: 'The loopback address',
        },
        {
          type: 'tf',
          question: 'A host with an IP address of 169.254.10.5 has successfully obtained an address from a DHCP server.',
          answer: false,
          explanation: '169.254.0.0/16 is the APIPA range — automatically assigned by the OS when DHCP fails. It always indicates a DHCP configuration problem.',
        },
        {
          type: 'mcq',
          question: 'What is the APIPA address range?',
          choices: ['127.0.0.0/8', '169.254.0.0/16', '172.16.0.0/12', '192.168.0.0/16'],
          answer: '169.254.0.0/16',
        },
        {
          type: 'fill',
          question: 'APIPA stands for Automatic Private IP ________.',
          answer: 'Addressing',
        },
        {
          type: 'mcq',
          question: 'Which IP address is the limited broadcast address?',
          choices: ['0.0.0.0', '127.0.0.1', '255.255.255.255', '224.0.0.1'],
          answer: '255.255.255.255',
        },
        {
          type: 'tf',
          question: 'Routers forward packets sent to 255.255.255.255 by default.',
          answer: false,
          explanation: '255.255.255.255 is the limited broadcast address and is only delivered to hosts on the local network. Routers do not forward limited broadcasts.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Private Address Space (RFC 1918)
    // ─────────────────────────────────────────────────────────
    {
      id: 's5l3',
      title: 'Private Address Space',
      icon: '🔒',
      questions: [
        {
          type: 'teach',
          title: 'The Private Realms — RFC 1918',
          body: 'Not all IPv4 addresses are publicly routable on the internet. RFC 1918 defines three private address ranges — reserved for use inside organisations and never routed on the public internet:\n\n10.0.0.0/8 — One large Class A block (16.7 million addresses).\n172.16.0.0/12 — Sixteen Class B blocks (172.16.0.0 to 172.31.255.255).\n192.168.0.0/16 — 256 Class C blocks (192.168.0.0 to 192.168.255.255).\n\nNAT (Network Address Translation) converts private addresses to public ones at the network edge.',
        },
        {
          type: 'teach',
          title: 'Why Private Addresses Exist',
          body: 'IPv4 has roughly 4.3 billion addresses — far fewer than the number of devices connected to the internet. Private addressing solves this by allowing many organisations to reuse the same private ranges internally, while using just one (or a few) public IPs via NAT.\n\nThis is why your home router has a public IP from your ISP, while every device in your house uses a 192.168.x.x address internally.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is a valid RFC 1918 private address?',
          choices: ['172.32.0.1', '192.169.1.1', '172.20.5.10', '10.256.0.1'],
          answer: '172.20.5.10',
          explanation: '172.20.5.10 is in the 172.16.0.0–172.31.255.255 range. 172.32.x.x is public. 192.169.x.x is public. 10.256.0.1 is invalid (256 > 255).',
        },
        {
          type: 'mcq',
          question: 'What is the private address range for Class A (RFC 1918)?',
          choices: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8'],
          answer: '10.0.0.0/8',
        },
        {
          type: 'tf',
          question: 'Private IP addresses (RFC 1918) are routable on the public internet.',
          answer: false,
          explanation: 'RFC 1918 private addresses are not routed on the public internet. ISP routers discard packets with private source/destination addresses. NAT is used to translate private addresses to public ones.',
        },
        {
          type: 'mcq',
          question: 'What is the RFC 1918 private range for Class B addresses?',
          choices: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'],
          answer: '172.16.0.0/12',
        },
        {
          type: 'fill',
          question: 'The technology that converts private IP addresses to public IP addresses at the network edge is called ________.',
          answer: 'NAT',
        },
        {
          type: 'mcq',
          question: 'Which RFC defines the private IPv4 address ranges?',
          choices: ['RFC 791', 'RFC 1918', 'RFC 2460', 'RFC 4271'],
          answer: 'RFC 1918',
        },
        {
          type: 'wordbank',
          question: 'Match each RFC 1918 private range to its class:',
          bank: ['Class A', 'Class B', 'Class C', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
          answer: ['Class A', '10.0.0.0/8', 'Class B', '172.16.0.0/12', 'Class C', '192.168.0.0/16'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's5l4',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'What class is the IP address 203.0.113.5?',
          choices: ['Class A', 'Class B', 'Class C', 'Class D'],
          answer: 'Class C',
        },
        {
          type: 'mcq',
          question: 'Which address would you see on a host that failed to get a DHCP lease?',
          choices: ['10.0.0.1', '127.0.0.1', '169.254.45.10', '192.168.0.1'],
          answer: '169.254.45.10',
        },
        {
          type: 'tf',
          question: 'The address 172.16.0.0/12 covers the range 172.16.0.0 to 172.31.255.255.',
          answer: true,
          explanation: 'A /12 mask means the first 12 bits are fixed. 172.16 in binary: 10101100.00010000. The last 4 bits of the second octet can vary, giving 172.16–172.31.',
        },
        {
          type: 'mcq',
          question: 'What is the default subnet mask for a Class A network?',
          choices: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.128.0.0'],
          answer: '255.0.0.0',
        },
        {
          type: 'fill',
          question: 'Class D addresses (224.0.0.0–239.255.255.255) are reserved for ________ traffic.',
          answer: 'multicast',
        },
        {
          type: 'mcq',
          question: 'Which of the following is NOT an RFC 1918 private address?',
          choices: ['10.1.1.1', '172.16.254.1', '192.168.100.1', '172.32.0.1'],
          answer: '172.32.0.1',
          explanation: '172.32.0.1 is outside the 172.16.0.0–172.31.255.255 RFC 1918 range and is a public address.',
        },
        {
          type: 'tf',
          question: '127.0.0.1 is the standard loopback address used to test the local TCP/IP stack.',
          answer: true,
          explanation: 'The entire 127.0.0.0/8 range is reserved for loopback. 127.0.0.1 is the most commonly used loopback address.',
        },
        {
          type: 'mcq',
          question: 'A Class B address has a default mask of /16. How many host addresses are available per network by default?',
          choices: ['254', '65,534', '16,777,214', '255'],
          answer: '65,534',
          explanation: '2^16 = 65,536 addresses. Subtract network and broadcast = 65,534 usable hosts.',
        },
        {
          type: 'wordbank',
          question: 'Classify each address as Private (RFC 1918) or Public:',
          bank: ['10.10.10.1', '8.8.8.8', '172.20.0.1', '203.0.113.1'],
          answer: ['10.10.10.1', '172.20.0.1', '8.8.8.8', '203.0.113.1'],
          explanation: 'Private: 10.10.10.1 (Class A), 172.20.0.1 (Class B). Public: 8.8.8.8 (Google DNS), 203.0.113.1 (documentation range but public class).',
        },
      ],
    },
  ],
};
