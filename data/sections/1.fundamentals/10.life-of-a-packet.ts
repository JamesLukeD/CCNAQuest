import type { Section } from '../../../lib/types';

export const SECTION_LIFE_OF_A_PACKET: Section = {
  id: 'life-of-a-packet',
  title: 'The Life of a Packet',
  icon: '✈️',
  unlockAfter: 'cisco-device-functions',
  lessons: [
    // ─────────────────────────────────────────────────────────
    // Lesson 1 – Encapsulation: The Sending Stack
    // ─────────────────────────────────────────────────────────
    {
      id: 's10l1',
      title: 'Encapsulation: The Sending Stack',
      icon: '📦',
      questions: [
        {
          type: 'teach',
          title: 'The Grand Ritual of Sending',
          body: 'Before a single bit leaves Host A, the data is wrapped in layers — like a letter placed inside an envelope, then a box, then a shipping container. This is encapsulation:\n\nLayer 7 (App) — The application generates data.\nLayer 4 (Transport) — TCP or UDP header is added → Segment.\nLayer 3 (Network) — IP header is added (source IP, destination IP) → Packet.\nLayer 2 (Data Link) — Ethernet header and FCS are added (source MAC, destination MAC) → Frame.\nLayer 1 (Physical) — The frame is converted to bits and transmitted.',
        },
        {
          type: 'teach',
          title: 'Same-Network vs Different-Network Destinations',
          body: 'When Host A sends to a destination, it first asks: is the destination on my subnet?\n\nSame network → the destination MAC is the target host\'s MAC. ARP resolves it directly.\nDifferent network → Host A cannot reach the destination directly. It must send to its default gateway (the router). Host A puts the ROUTER\'S MAC in the frame destination — but the destination IP is still the final target host\'s IP.\n\nThis distinction is critical: the destination IP never changes en route (without NAT). The destination MAC changes at every hop.',
        },
        {
          type: 'mcq',
          question: 'What is the correct order of encapsulation as data travels from Layer 7 to Layer 1?',
          choices: [
            'Data → Segment → Packet → Frame → Bits',
            'Bits → Frame → Packet → Segment → Data',
            'Frame → Packet → Segment → Data → Bits',
            'Data → Frame → Packet → Segment → Bits',
          ],
          answer: 'Data → Segment → Packet → Frame → Bits',
        },
        {
          type: 'mcq',
          question: 'Host A (10.1.1.10/24) wants to send data to 10.2.2.20. What MAC address does Host A place in the destination MAC field of the Ethernet frame?',
          choices: [
            'The MAC address of 10.2.2.20',
            'The MAC address of the default gateway',
            'The broadcast MAC FF:FF:FF:FF:FF:FF',
            'The MAC address of the nearest switch',
          ],
          answer: 'The MAC address of the default gateway',
          explanation: '10.2.2.20 is on a different subnet. Host A cannot reach it directly, so it sends the frame to its default gateway. The MAC destination = gateway MAC, but IP destination = 10.2.2.20.',
        },
        {
          type: 'tf',
          question: 'The destination IP address in a packet changes at every router hop.',
          answer: false,
          explanation: 'The source and destination IP addresses remain unchanged throughout the journey (unless NAT is in use). Only the source and destination MAC addresses change at each hop.',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer is the IP header added during encapsulation?',
          choices: ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 5'],
          answer: 'Layer 3',
        },
        {
          type: 'mcq',
          question: 'Host A is on 192.168.1.0/24 and wants to send to 192.168.1.50. Which MAC address goes in the Ethernet frame destination?',
          choices: [
            'The default gateway MAC',
            'The broadcast MAC',
            'The MAC address of 192.168.1.50',
            'Host A\'s own MAC',
          ],
          answer: 'The MAC address of 192.168.1.50',
          explanation: '192.168.1.50 is on the same /24 subnet as the sender. Host A can reach it directly — no need for the gateway. It ARPs for 192.168.1.50\'s MAC directly.',
        },
        {
          type: 'fill',
          question: 'At Layer 4, data plus the TCP or UDP header is called a ________.',
          answer: 'segment',
        },
        {
          type: 'tf',
          question: 'When Host A sends to a destination on a different network, the destination IP in the packet is the gateway\'s IP.',
          answer: false,
          explanation: 'The destination IP is always the FINAL destination host\'s IP — not the gateway\'s. The gateway\'s IP only appears as the next-hop in the routing table, not in the packet\'s IP header.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 2 – ARP Resolution: Finding the Gateway
    // ─────────────────────────────────────────────────────────
    {
      id: 's10l2',
      title: 'ARP Resolution: Finding the Gateway',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'The ARP Ritual Before Every Journey',
          body: 'Before Host A can send a frame to its gateway, it needs the gateway\'s MAC address. If the ARP cache is empty, Host A performs the ARP ritual:\n\n1. Host A sends a broadcast ARP Request: "Who has 10.1.1.1? Tell 10.1.1.10."\n2. All devices on the segment receive it. Only the router interface (10.1.1.1) replies.\n3. The router sends a unicast ARP Reply: "10.1.1.1 is at AA:BB:CC:DD:EE:FF."\n4. Host A caches the entry and builds the Ethernet frame.\n\nSubsequent packets use the cached entry — no ARP needed until the entry ages out. Cisco IOS devices default to a 4-hour ARP cache timeout. Windows hosts typically age out entries in 2 minutes; macOS uses ~20 minutes.',
        },
        {
          type: 'teach',
          title: 'ARP Only Works Locally',
          body: 'ARP is a Layer 2 protocol — it only works within the same broadcast domain. You cannot ARP across a router.\n\nIf a host misconfigures its subnet mask and believes a remote host is local, it will ARP for the remote IP directly and never get a reply — the frame will never be built and the connection will silently fail.\n\nProxy ARP is a router feature where the router answers ARP requests on behalf of remote hosts. It is disabled by default on modern Cisco interfaces and considered a legacy workaround.',
        },
        {
          type: 'mcq',
          question: 'What type of frame is an ARP Request sent as?',
          choices: ['Unicast', 'Multicast', 'Broadcast', 'Anycast'],
          answer: 'Broadcast',
          explanation: 'The ARP Request uses a destination MAC of FF:FF:FF:FF:FF:FF so every host on the local segment receives it.',
        },
        {
          type: 'mcq',
          question: 'A host has an empty ARP cache and wants to send a packet to a host on a different subnet. What does it ARP for?',
          choices: [
            'The destination host\'s IP address',
            'The DNS server\'s IP address',
            'The default gateway\'s IP address',
            'The switch\'s MAC address',
          ],
          answer: 'The default gateway\'s IP address',
          explanation: 'Since the destination is on a different subnet, the host sends traffic to its default gateway. It needs the gateway\'s MAC, so it ARPs for the gateway\'s IP.',
        },
        {
          type: 'tf',
          question: 'ARP requests can cross router boundaries to resolve MAC addresses on remote networks.',
          answer: false,
          explanation: 'ARP is a Layer 2 broadcast — routers do not forward broadcasts by default. ARP only works within the local broadcast domain (subnet).',
        },
        {
          type: 'mcq',
          question: 'What is Proxy ARP?',
          choices: [
            'A feature where a switch responds to ARP requests instead of the host',
            'A feature where a router responds to ARP requests on behalf of hosts on other networks',
            'A security feature that blocks all ARP traffic',
            'A method to encrypt ARP replies',
          ],
          answer: 'A feature where a router responds to ARP requests on behalf of hosts on other networks',
        },
        {
          type: 'fill',
          question: 'The Cisco IOS command to view the ARP cache on a router is show ip ________.',
          answer: 'arp',
        },
        {
          type: 'tf',
          question: 'After a successful ARP exchange, the IP-to-MAC mapping is stored in the ARP cache for future use.',
          answer: true,
          explanation: 'Hosts cache ARP replies to avoid repeating the ARP process for every packet. The cache entry expires after a timeout period (typically 4 hours on modern OSes).',
        },
        {
          type: 'mcq',
          question: 'Which command on a Windows host displays the ARP cache?',
          choices: ['ipconfig /all', 'arp -a', 'netstat -r', 'ping -arp'],
          answer: 'arp -a',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 3 – Frame Rewrite at Each Hop
    // ─────────────────────────────────────────────────────────
    {
      id: 's10l3',
      title: 'Frame Rewrite at Each Hop',
      icon: '🔄',
      questions: [
        {
          type: 'teach',
          title: 'The Costume Change at Every Router',
          body: 'When a router receives a frame, it strips the Layer 2 header (the frame\'s "costume") and reads the Layer 3 packet inside. It then:\n\n1. Checks the destination IP against its routing table.\n2. Decrements the TTL by 1.\n3. ARPs for the next-hop MAC (or uses its ARP cache).\n4. Builds a BRAND NEW Ethernet frame with: Source MAC = this router\'s outgoing interface MAC. Destination MAC = next-hop device\'s MAC.\n\nThe packet inside (with source and destination IP) is untouched. Only the frame wrapper is rebuilt.',
        },
        {
          type: 'teach',
          title: 'IP Stays, MAC Changes — Every Time',
          body: 'This is the most-tested concept in this section. Through the entire journey:\n\nSource IP → never changes (it is always the originating host\'s IP)\nDestination IP → never changes (it is always the final destination\'s IP)\nSource MAC → changes at every hop (becomes the sending router interface\'s MAC)\nDestination MAC → changes at every hop (becomes the next-hop device\'s MAC)\n\nThis is why a router can connect networks that use completely different MAC address schemes — it rebuilds the frame at each hop.',
        },
        {
          type: 'mcq',
          question: 'What happens to the source and destination IP addresses as a packet passes through a router?',
          choices: [
            'Both change to the router\'s interface IPs',
            'Source IP changes; destination IP stays the same',
            'Both remain unchanged',
            'Destination IP changes; source IP stays the same',
          ],
          answer: 'Both remain unchanged',
          explanation: 'IP addresses are not modified by routers (without NAT). The source IP is always the originating host; the destination IP is always the final target.',
        },
        {
          type: 'mcq',
          question: 'What happens to the source and destination MAC addresses as a packet passes through a router?',
          choices: [
            'Both remain unchanged throughout the journey',
            'Only the source MAC changes at each hop',
            'Both source and destination MAC are rewritten at each hop',
            'Only the destination MAC changes at each hop',
          ],
          answer: 'Both source and destination MAC are rewritten at each hop',
          explanation: 'At each router hop, the frame is stripped and rebuilt. The new source MAC is the router\'s outgoing interface; the new destination MAC is the next-hop device\'s MAC.',
        },
        {
          type: 'tf',
          question: 'A router decrements the TTL field in the IP packet by 1 before forwarding it.',
          answer: true,
          explanation: 'Every router that forwards a packet decrements TTL by 1. When TTL hits 0, the router drops the packet and sends an ICMP Time Exceeded back to the source.',
        },
        {
          type: 'mcq',
          question: 'Packet travels from Host A → Router R1 → Router R2 → Host B. How many times are the MAC addresses rewritten?',
          choices: ['1', '2', '3', '4'],
          answer: '2',
          explanation: 'MACs are rewritten at each router hop: once at R1 (new frame toward R2) and once at R2 (new frame toward Host B). Two rewrites.',
        },
        {
          type: 'mcq',
          question: 'After a router forwards a packet, what is the destination MAC address in the new frame?',
          choices: [
            'The original sending host\'s MAC address',
            'The final destination host\'s MAC address',
            'The MAC address of the next-hop device',
            'The broadcast MAC FF:FF:FF:FF:FF:FF',
          ],
          answer: 'The MAC address of the next-hop device',
        },
        {
          type: 'fill',
          question: 'When a router forwards a packet, the new frame\'s source MAC is the MAC of the router\'s ________ interface.',
          answer: 'outgoing',
        },
        {
          type: 'tf',
          question: 'When a packet crosses three routers to reach its destination, the source IP changes three times.',
          answer: false,
          explanation: 'The source IP never changes en route (without NAT). It always identifies the originating host.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 4 – De-encapsulation: The Receiving Stack
    // ─────────────────────────────────────────────────────────
    {
      id: 's10l4',
      title: 'De-encapsulation: The Receiving Stack',
      icon: '📬',
      questions: [
        {
          type: 'teach',
          title: 'Unwrapping the Package',
          body: 'When the final frame arrives at Host B, the process reverses — each layer strips its own header and passes the payload up to the next layer:\n\nLayer 1 — Receives bits, converts to a frame.\nLayer 2 — Checks destination MAC (matches Host B), verifies FCS. Strips frame header → passes IP packet up.\nLayer 3 — Reads destination IP (matches Host B), checks TTL and integrity. Strips IP header → passes segment up.\nLayer 4 — TCP checks sequence numbers, sends ACK, reassembles data. Strips header → passes data to application.\nLayer 7 — The application receives the original data.',
        },
        {
          type: 'teach',
          title: 'The Full Round Trip — Tying It All Together',
          body: 'The complete life of a packet, from first to last:\n\n1. App generates data on Host A → encapsulation down the stack.\n2. ARP resolves the gateway MAC.\n3. Frame leaves Host A toward the gateway.\n4. Router R1: strips frame, checks routing table, decrements TTL, builds new frame toward next hop.\n5. (Repeat for each router hop.)\n6. Final router forwards frame to Host B.\n7. Host B: de-encapsulates up the stack, delivers data to application.\n8. TCP ACK travels back the same way.\n\nEvery network troubleshooter follows this same path mentally when diagnosing problems.',
        },
        {
          type: 'mcq',
          question: 'What does Host B check at Layer 2 when it receives a frame?',
          choices: [
            'The destination IP address',
            'The destination MAC address and FCS',
            'The TCP sequence number',
            'The TTL value',
          ],
          answer: 'The destination MAC address and FCS',
          explanation: 'Layer 2 verifies the destination MAC (does this frame belong to me?) and the FCS (was the frame corrupted in transit?)',
        },
        {
          type: 'mcq',
          question: 'De-encapsulation occurs on which device?',
          choices: [
            'Every router along the path',
            'The sending host only',
            'The receiving (destination) host',
            'The first switch in the path',
          ],
          answer: 'The receiving (destination) host',
          explanation: 'De-encapsulation — stripping all headers back to the original application data — happens at the destination host. Routers only strip and rebuild Layer 2; they do not de-encapsulate to Layer 7.',
        },
        {
          type: 'tf',
          question: 'If the FCS in a received frame does not match, the receiving device retransmits an error correction.',
          answer: false,
          explanation: 'Layer 2 detects errors via FCS but silently discards the frame. Error recovery is the responsibility of higher layers — for example, TCP at Layer 4 will detect the missing segment and request retransmission.',
        },
        {
          type: 'mcq',
          question: 'At which layer does the receiving host reassemble TCP segments into the original data stream?',
          choices: ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'],
          answer: 'Layer 4',
          explanation: 'TCP at Layer 4 uses sequence numbers to reorder and reassemble segments into the correct data stream before passing it to the application.',
        },
        {
          type: 'tf',
          question: 'Routers perform full de-encapsulation to Layer 7 to read application data before forwarding packets.',
          answer: false,
          explanation: 'Routers only de-encapsulate to Layer 3. They read the IP header to make a forwarding decision, then rebuild the Layer 2 frame. Layer 7 content is not inspected (unless an application-layer gateway or NGFW is in use).',
        },
        {
          type: 'mcq',
          question: 'Which layer on the receiving host verifies that the destination IP matches before passing the data upward?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 3',
          explanation: 'Layer 3 (IP) checks the destination IP address. If it matches, the IP header is stripped and the segment is passed to Layer 4.',
        },
        {
          type: 'fill',
          question: 'The process of removing headers at each layer on the receiving host is called ________.',
          answer: 'de-encapsulation',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // Lesson 5 – Module 1 Review
    // ─────────────────────────────────────────────────────────
    {
      id: 's10l5',
      title: 'Module 1 Review',
      icon: '🏆',
      questions: [
        {
          type: 'mcq',
          question: 'Host A sends a packet to Host B on a different network. Which address in the Ethernet frame changes at each router hop?',
          choices: ['Source and Destination IP', 'Source and Destination MAC', 'Destination IP only', 'Source IP only'],
          answer: 'Source and Destination MAC',
        },
        {
          type: 'mcq',
          question: 'How many times is a new Ethernet frame built as a packet travels through two routers to its destination?',
          choices: ['1', '2', '3', '4'],
          answer: '2',
          explanation: 'A new frame is created at each hop: Host A builds the first frame, Router 1 rebuilds it for the next segment, Router 2 rebuilds it for the final segment. That is 3 total frames, but 2 rewrites by routers.',
        },
        {
          type: 'tf',
          question: 'A host that needs to reach a remote destination places the gateway\'s MAC — not the destination\'s MAC — in the Ethernet frame.',
          answer: true,
          explanation: 'For traffic to a different subnet, the destination MAC = gateway MAC, but the destination IP = final target IP. The router uses the IP to determine where to send it next.',
        },
        {
          type: 'mcq',
          question: 'A host has no entry in its ARP cache for its default gateway. What does it send first?',
          choices: [
            'A TCP SYN to the destination',
            'A DNS query',
            'A broadcast ARP Request for the gateway\'s IP',
            'An ICMP Echo Request to the destination',
          ],
          answer: 'A broadcast ARP Request for the gateway\'s IP',
        },
        {
          type: 'fill',
          question: 'The source and destination ________ addresses never change as a packet travels between routers (without NAT).',
          answer: 'IP',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does a router make its forwarding decision?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 3',
        },
        {
          type: 'mcq',
          question: 'Which action does a router take on the TTL field when forwarding a packet?',
          choices: ['Resets it to 255', 'Doubles it', 'Decrements it by 1', 'Ignores it'],
          answer: 'Decrements it by 1',
        },
        {
          type: 'tf',
          question: 'ARP broadcasts can cross router boundaries to resolve MAC addresses on remote subnets.',
          answer: false,
          explanation: 'ARP is a Layer 2 broadcast — routers block broadcasts by default. ARP only resolves MAC addresses within the local subnet.',
        },
        {
          type: 'wordbank',
          question: 'Order the encapsulation steps from Layer 7 to Layer 1:',
          bank: ['Bits', 'Segment', 'Packet', 'Frame', 'Data'],
          answer: ['Data', 'Segment', 'Packet', 'Frame', 'Bits'],
        },
        {
          type: 'mcq',
          question: 'What happens at Layer 2 on the receiving host if the FCS check fails?',
          choices: [
            'The frame is corrected and passed up',
            'The frame is silently discarded',
            'A NACK is sent back to the source',
            'The TTL is reset and the frame is retransmitted',
          ],
          answer: 'The frame is silently discarded',
        },
      ],
    },
  ],
};
