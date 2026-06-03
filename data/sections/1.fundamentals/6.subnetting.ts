import type { Section } from '../../../lib/types';

export const SECTION_SUBNETTING: Section = {
  id: 'subnetting',
  title: 'Subnetting',
  icon: '✂️',
  unlockAfter: 'ip-address-classes',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Why We Subnet & CIDR Notation
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l1',
      title: 'Why We Subnet & CIDR',
      icon: '✂️',
      questions: [
        {
          type: 'teach',
          title: 'The Problem With Classful Addressing',
          body: 'Classful addressing is wasteful. Need 300 hosts? A Class C only gives you 254, so you must use a Class B — wasting over 65,000 addresses. Subnetting solves this by letting you slice a large address block into smaller, right-sized pieces.\n\nSubnetting also improves security and performance: smaller networks mean less broadcast traffic and cleaner boundaries for access control.',
        },
        {
          type: 'teach',
          title: 'CIDR Notation',
          body: 'CIDR (Classless Inter-Domain Routing) replaces class-based thinking with prefix notation. Instead of writing 255.255.255.0, you write /24 — which means "the first 24 bits are the network portion."\n\nThe remaining bits are the host portion. A /26 has 26 network bits and 6 host bits: 2^6 = 64 addresses total, 62 usable hosts. CIDR lets any prefix length from /0 to /32 be used.',
        },
        {
          type: 'mcq',
          question: 'What is the main purpose of subnetting?',
          choices: [
            'To increase the speed of routing',
            'To divide a large network into smaller, more manageable segments',
            'To encrypt traffic between hosts',
            'To assign MAC addresses automatically',
          ],
          answer: 'To divide a large network into smaller, more manageable segments',
        },
        {
          type: 'mcq',
          question: 'In CIDR notation, what does the /26 in 192.168.1.0/26 indicate?',
          choices: [
            '26 host bits remain',
            'The network supports 26 hosts',
            '26 bits are used for the network portion',
            'The subnet has 26 subnets',
          ],
          answer: '26 bits are used for the network portion',
        },
        {
          type: 'tf',
          question: 'CIDR allows variable-length subnet masks, unlike traditional classful addressing.',
          answer: true,
          explanation: 'CIDR (Classless Inter-Domain Routing) removes the strict Class A/B/C boundary rules, allowing any prefix length from /0 to /32.',
        },
        {
          type: 'fill',
          question: 'CIDR stands for Classless Inter-Domain ________.',
          answer: 'Routing',
        },
        {
          type: 'mcq',
          question: 'How many host bits are available in a /26 address?',
          choices: ['4', '6', '8', '10'],
          answer: '6',
          explanation: '32 total bits - 26 network bits = 6 host bits.',
        },
        {
          type: 'mcq',
          question: 'How many subnets are created when you borrow 2 bits from a /24 network?',
          choices: ['2', '4', '6', '8'],
          answer: '4',
          explanation: '2^2 = 4 subnets.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – Subnet Mask Mechanics
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l2',
      title: 'Subnet Mask Mechanics',
      icon: '🔬',
      questions: [
        {
          type: 'teach',
          title: 'The Mask Separates Network from Host',
          body: 'A subnet mask is a 32-bit value where all the network bits are 1 and all the host bits are 0. To find the network address of any IP address, perform a binary AND operation: IP AND mask = network address.\n\nExample: 192.168.1.130 AND 255.255.255.128 (/25) → 192.168.1.128. The host is in the 192.168.1.128/25 subnet.',
        },
        {
          type: 'teach',
          title: 'Key Masks to Memorise',
          body: 'These subnet masks appear constantly on the CCNA exam. Commit them to memory:\n\n/24 = 255.255.255.0   (256 addresses, 254 hosts)\n/25 = 255.255.255.128 (128 addresses, 126 hosts)\n/26 = 255.255.255.192 (64 addresses, 62 hosts)\n/27 = 255.255.255.224 (32 addresses, 30 hosts)\n/28 = 255.255.255.240 (16 addresses, 14 hosts)\n/29 = 255.255.255.248 (8 addresses, 6 hosts)\n/30 = 255.255.255.252 (4 addresses, 2 hosts)',
        },
        {
          type: 'mcq',
          question: 'What is the subnet mask for a /26 network in dotted decimal?',
          choices: ['255.255.255.128', '255.255.255.192', '255.255.255.224', '255.255.255.240'],
          answer: '255.255.255.192',
        },
        {
          type: 'mcq',
          question: 'What is the subnet mask for a /28 network in dotted decimal?',
          choices: ['255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248'],
          answer: '255.255.255.240',
        },
        {
          type: 'tf',
          question: 'The subnet mask 255.255.255.128 is equivalent to /25.',
          answer: true,
          explanation: '255.255.255.128 in binary has 25 consecutive 1-bits (8+8+8+1), making it a /25 prefix.',
        },
        {
          type: 'fill',
          question: 'The subnet mask for /24 in dotted decimal is 255.255.255.________.',
          answer: '0',
        },
        {
          type: 'mcq',
          question: 'What is the CIDR prefix length for the mask 255.255.255.252?',
          choices: ['/28', '/29', '/30', '/31'],
          answer: '/30',
          explanation: '255.255.255.252 in binary = 11111111.11111111.11111111.11111100 — 30 ones = /30.',
        },
        {
          type: 'wordbank',
          question: 'Match each subnet mask to its CIDR prefix:',
          bank: ['255.255.255.0', '/24', '255.255.255.192', '/26', '255.255.255.252', '/30'],
          answer: ['255.255.255.0', '/24', '255.255.255.192', '/26', '255.255.255.252', '/30'],
        },
        {
          type: 'mcq',
          question: 'How many network bits are in the mask 255.255.0.0?',
          choices: ['8', '16', '24', '32'],
          answer: '16',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Calculating Network, Broadcast & Host Ranges
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l3',
      title: 'Network, Broadcast & Host Ranges',
      icon: '🧮',
      questions: [
        {
          type: 'teach',
          title: 'The Block Size Method',
          body: 'The fastest way to subnet without binary math:\n\n1. Find the interesting octet (the one that is not 255 or 0 in the mask).\n2. Block size = 256 − mask value in that octet.\n3. Subnets start at multiples of the block size: 0, block, block×2, block×3…\n4. Network address = start of the block. Broadcast = next block start − 1. Hosts = everything between.\n\nExample: /26 → mask 192 in last octet → block = 256−192 = 64. Subnets: .0, .64, .128, .192.',
        },
        {
          type: 'teach',
          title: 'Usable Hosts Formula',
          body: 'Usable hosts per subnet = 2^h − 2, where h is the number of host bits.\n\nYou subtract 2 because the first address is the network address (all host bits = 0) and the last is the broadcast address (all host bits = 1) — neither can be assigned to a host.\n\n/30 → 2 host bits → 2^2 − 2 = 2 hosts (perfect for point-to-point links)\n/29 → 3 host bits → 2^3 − 2 = 6 hosts\n/27 → 5 host bits → 2^5 − 2 = 30 hosts',
        },
        {
          type: 'mcq',
          question: 'How many usable host addresses does a /27 subnet provide?',
          choices: ['28', '30', '32', '62'],
          answer: '30',
          explanation: '/27 has 5 host bits. 2^5 − 2 = 30 usable hosts.',
        },
        {
          type: 'mcq',
          question: 'How many usable host addresses does a /30 subnet provide?',
          choices: ['1', '2', '4', '6'],
          answer: '2',
          explanation: '/30 has 2 host bits. 2^2 − 2 = 2 usable hosts. This is the standard mask for point-to-point WAN links.',
        },
        {
          type: 'tf',
          question: 'A /30 subnet provides 2 usable host addresses, making it ideal for point-to-point WAN links.',
          answer: true,
          explanation: 'A /30 gives exactly 2 usable host IPs — one for each end of a point-to-point link — with no waste.',
        },
        {
          type: 'mcq',
          question: 'What is the broadcast address of the subnet 192.168.1.64/26?',
          choices: ['192.168.1.126', '192.168.1.127', '192.168.1.128', '192.168.1.129'],
          answer: '192.168.1.127',
          explanation: '/26 has a block size of 64. The subnet starts at .64 and the next block starts at .128. Broadcast = .128 − 1 = .127.',
        },
        {
          type: 'mcq',
          question: 'What is the first usable host address in the subnet 192.168.1.0/28?',
          choices: ['192.168.1.0', '192.168.1.1', '192.168.1.14', '192.168.1.15'],
          answer: '192.168.1.1',
          explanation: 'Network address is .0; first usable host is .1.',
        },
        {
          type: 'fill',
          question: 'The block size for the /27 mask (255.255.255.224) is ________.',
          answer: '32',
          explanation: '256 − 224 = 32.',
        },
        {
          type: 'mcq',
          question: 'A /29 subnet has how many usable host addresses?',
          choices: ['4', '6', '8', '14'],
          answer: '6',
          explanation: '/29 has 3 host bits. 2^3 − 2 = 6.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – Subnetting a Class C Network
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l4',
      title: 'Subnetting a Class C Network',
      icon: '🔪',
      questions: [
        {
          type: 'teach',
          title: 'Dividing 192.168.1.0/24 into /26 Subnets',
          body: 'Starting with 192.168.1.0/24, borrow 2 bits → /26. Block size = 64. This creates 4 subnets:\n\nSubnet 1: 192.168.1.0/26   — hosts .1–.62, broadcast .63\nSubnet 2: 192.168.1.64/26  — hosts .65–.126, broadcast .127\nSubnet 3: 192.168.1.128/26 — hosts .129–.190, broadcast .191\nSubnet 4: 192.168.1.192/26 — hosts .193–.254, broadcast .255\n\nEach subnet supports 62 hosts.',
        },
        {
          type: 'teach',
          title: 'Choosing the Right Subnet Size',
          body: 'Always choose the smallest subnet that fits your requirements:\n\nNeed 50 hosts? → /26 (62 hosts) ✓ — /27 (30 hosts) is too small\nNeed 10 hosts? → /28 (14 hosts) ✓ — efficient\nNeed 2 hosts (WAN link)? → /30 (2 hosts) ✓ — no waste\n\nUsable hosts = 2^h − 2. Work backwards from your requirement to find the right prefix.',
        },
        {
          type: 'mcq',
          question: 'How many /26 subnets can be created from the 192.168.1.0/24 network?',
          choices: ['2', '4', '8', '16'],
          answer: '4',
          explanation: 'Borrowing 2 bits from a /24 gives 2^2 = 4 subnets.',
        },
        {
          type: 'mcq',
          question: 'What is the network address of the second /26 subnet within 192.168.1.0/24?',
          choices: ['192.168.1.32', '192.168.1.64', '192.168.1.128', '192.168.1.192'],
          answer: '192.168.1.64',
          explanation: 'Block size = 64. Subnets start at 0, 64, 128, 192. Second subnet = .64.',
        },
        {
          type: 'tf',
          question: 'The broadcast address of the 192.168.1.0/26 subnet is 192.168.1.63.',
          answer: true,
          explanation: 'Network = .0, block size = 64, so the range is .0–.63. Broadcast = .63, the last address in the block.',
        },
        {
          type: 'mcq',
          question: 'You need a subnet to accommodate 50 hosts. Which prefix length should you use?',
          choices: ['/25', '/26', '/27', '/28'],
          answer: '/26',
          explanation: '/26 provides 62 usable hosts (2^6−2). /27 only provides 30 — too few.',
        },
        {
          type: 'mcq',
          question: 'How many usable hosts per subnet does 192.168.1.0/24 divided into /28 subnets provide?',
          choices: ['8', '12', '14', '16'],
          answer: '14',
          explanation: '/28 has 4 host bits. 2^4 − 2 = 14 usable hosts.',
        },
        {
          type: 'fill',
          question: 'When subnetting 192.168.1.0/24 into /26 subnets, the block size is ________.',
          answer: '64',
        },
        {
          type: 'mcq',
          question: 'What is the last usable host in the subnet 192.168.1.128/26?',
          choices: ['192.168.1.128', '192.168.1.189', '192.168.1.190', '192.168.1.191'],
          answer: '192.168.1.190',
          explanation: 'Network = .128, broadcast = .191 (block size 64: .128+64−1). Last usable host = broadcast − 1 = .190.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – VLSM
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l5',
      title: 'VLSM',
      icon: '🎯',
      questions: [
        {
          type: 'teach',
          title: 'Variable Length Subnet Masking',
          body: 'VLSM (Variable Length Subnet Masking) allows you to use different prefix lengths for different subnets within the same major network. This eliminates wasted addresses.\n\nExample: you have 10.0.0.0/24 and need:\n— Office A: 50 hosts → assign 10.0.0.0/26 (62 hosts)\n— Office B: 10 hosts → assign 10.0.0.64/28 (14 hosts)\n— WAN link: 2 hosts → assign 10.0.0.80/30 (2 hosts)\n\nTotal used: 64+16+4 = 84 addresses. Without VLSM you would waste hundreds.',
        },
        {
          type: 'teach',
          title: 'VLSM Design Rules',
          body: 'VLSM requires a classless routing protocol (OSPF, EIGRP, RIPv2) — these protocols carry the subnet mask in their updates, enabling different-length prefixes to coexist.\n\nOld classful protocols (RIPv1) cannot support VLSM because they assume all subnets use the same mask.\n\nVLSM design rule: allocate the largest subnets first, then work down to the smallest. This ensures the address space remains contiguous and unambiguous.',
        },
        {
          type: 'mcq',
          question: 'What does VLSM stand for?',
          choices: [
            'Virtual LAN Subnet Mapping',
            'Variable Length Subnet Masking',
            'Virtual Layer Subnet Management',
            'Variable Link Subnet Mode',
          ],
          answer: 'Variable Length Subnet Masking',
        },
        {
          type: 'mcq',
          question: 'Which subnet mask would you assign to a point-to-point WAN link requiring only 2 host addresses?',
          choices: ['255.255.255.224', '255.255.255.240', '255.255.255.248', '255.255.255.252'],
          answer: '255.255.255.252',
          explanation: '255.255.255.252 = /30, which provides exactly 2 usable hosts — the perfect fit for a point-to-point link.',
        },
        {
          type: 'tf',
          question: 'VLSM requires a classless routing protocol such as OSPF or EIGRP.',
          answer: true,
          explanation: 'Classless routing protocols carry the subnet mask in their updates, allowing different prefix lengths in the same routing domain. Classful protocols like RIPv1 cannot support VLSM.',
        },
        {
          type: 'mcq',
          question: 'Which prefix length gives the least wasted addresses for a subnet that needs exactly 50 hosts?',
          choices: ['/25', '/26', '/27', '/28'],
          answer: '/26',
          explanation: '/26 provides 62 usable hosts (fits 50 with minimal waste). /25 provides 126 — over twice what is needed.',
        },
        {
          type: 'tf',
          question: 'With VLSM, all subnets within a network must use the same prefix length.',
          answer: false,
          explanation: 'VLSM explicitly allows different prefix lengths for different subnets within the same major network, enabling efficient address allocation.',
        },
        {
          type: 'mcq',
          question: 'Why should you allocate the largest subnets first when designing a VLSM scheme?',
          choices: [
            'Because routers prefer larger subnets',
            'To keep the address space contiguous and avoid overlap',
            'Because classful protocols require it',
            'To reduce the routing table size',
          ],
          answer: 'To keep the address space contiguous and avoid overlap',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 6 – Section Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's6l6',
      title: 'Section Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'How many usable host addresses does a /26 subnet provide?',
          choices: ['60', '62', '64', '126'],
          answer: '62',
          explanation: '6 host bits → 2^6 − 2 = 62.',
        },
        {
          type: 'mcq',
          question: 'What is the broadcast address of 10.0.0.128/25?',
          choices: ['10.0.0.191', '10.0.0.254', '10.0.0.255', '10.0.1.0'],
          answer: '10.0.0.255',
          explanation: '/25 block size = 128. Subnet starts at .128, next block at .256 (10.0.1.0), broadcast = .128+128−1 = .255.',
        },
        {
          type: 'tf',
          question: 'A host with IP 192.168.1.100 and mask 255.255.255.192 is in the 192.168.1.64/26 subnet.',
          answer: true,
          explanation: '/26 block size = 64. Subnets: .0, .64, .128. .100 falls in the .64–.127 block = 192.168.1.64/26.',
        },
        {
          type: 'mcq',
          question: 'Which mask is correct for a /29 prefix?',
          choices: ['255.255.255.224', '255.255.255.240', '255.255.255.248', '255.255.255.252'],
          answer: '255.255.255.248',
        },
        {
          type: 'fill',
          question: 'The usable hosts formula is 2^h ________ 2, where h is the number of host bits.',
          answer: 'minus',
        },
        {
          type: 'mcq',
          question: 'How many /28 subnets can be carved from a /24 network?',
          choices: ['8', '12', '16', '32'],
          answer: '16',
          explanation: 'Borrowing 4 bits from a /24 gives 2^4 = 16 subnets.',
        },
        {
          type: 'mcq',
          question: 'Which routing protocol does NOT support VLSM?',
          choices: ['OSPF', 'EIGRP', 'RIPv1', 'RIPv2'],
          answer: 'RIPv1',
          explanation: 'RIPv1 is a classful protocol that does not include the subnet mask in its updates, so it cannot support VLSM.',
        },
        {
          type: 'wordbank',
          question: 'Match each prefix to its usable host count:',
          bank: ['/30', '/29', '/28', '2 hosts', '6 hosts', '14 hosts'],
          answer: ['/30', '2 hosts', '/29', '6 hosts', '/28', '14 hosts'],
        },
        {
          type: 'tf',
          question: 'The network address 192.168.1.192/26 has a broadcast address of 192.168.1.255.',
          answer: true,
          explanation: 'Block size = 64. Subnet starts at .192, ends at .192+64−1 = .255. Broadcast = .255.',
        },
        {
          type: 'mcq',
          question: 'What is the block size of the /27 subnet mask (255.255.255.224)?',
          choices: ['16', '32', '64', '128'],
          answer: '32',
          explanation: '256 − 224 = 32.',
        },
      ],
    },
  ],
};
