import type { Section } from '../../../lib/types';

export const SECTION_CONNECTIVITY_TROUBLESHOOTING: Section = {
  id: 'connectivity-troubleshooting',
  title: 'Connectivity Troubleshooting',
  icon: '🩺',
  unlockAfter: 'dynamic-routing-protocols',
  lessons: [
    {
      id: 'l1',
      title: 'ping & traceroute',
      icon: '📶',
      questions: [
        {
          type: 'teach',
          title: 'How ping Works',
          body: 'ping sends ICMP Echo Request packets to a destination and waits for ICMP Echo Reply responses. Each character in the output represents one probe: "!" means a successful reply, "." means the request timed out, and "U" means the router received an ICMP Unreachable message from an intermediate device. A full five-exclamation result ("!!!!!") confirms end-to-end Layer 3 reachability.',
        },
        {
          type: 'teach',
          title: 'How traceroute Works',
          body: 'traceroute discovers the path packets take by sending probes with increasing TTL values starting at 1. Each router that decrements TTL to 0 returns an ICMP Time Exceeded message, revealing its IP address. Cisco IOS uses "traceroute [destination]" and "!" means a response, "*" means no response. Extended ping and traceroute allow you to specify the source interface — essential when testing specific paths.',
        },
        {
          type: 'mcq',
          question: 'What does a "." symbol mean in Cisco IOS ping output?',
          choices: [
            'ICMP Echo Reply received',
            'Request timed out',
            'ICMP Unreachable received',
            'Destination unreachable — network',
          ],
          answer: 'Request timed out',
        },
        {
          type: 'mcq',
          question: 'What does a "U" symbol mean in Cisco IOS ping output?',
          choices: [
            'Request timed out',
            'ICMP Unreachable received from an intermediate device',
            'Unknown host',
            'UDP probe sent',
          ],
          answer: 'ICMP Unreachable received from an intermediate device',
        },
        {
          type: 'tf',
          question: 'traceroute uses increasing TTL values to discover each hop along the path.',
          answer: true,
          explanation: 'traceroute starts with TTL=1, causing the first router to send back an ICMP Time Exceeded message. It then increments the TTL for each round, revealing each successive hop until the destination is reached.',
        },
        {
          type: 'mcq',
          question: 'Which ICMP message type does traceroute rely on to identify intermediate routers?',
          choices: [
            'Echo Reply',
            'Echo Request',
            'Time Exceeded',
            'Destination Unreachable',
          ],
          answer: 'Time Exceeded',
        },
        {
          type: 'mcq',
          question: 'You ping a host and get "!!!!!". What does this confirm?',
          choices: [
            'Layer 1 and 2 connectivity only',
            'End-to-end Layer 3 reachability',
            'The destination is a router',
            'The path is congested',
          ],
          answer: 'End-to-end Layer 3 reachability',
        },
        {
          type: 'fill',
          question: 'The Cisco IOS command to test the path to 8.8.8.8 hop by hop is "_____ 8.8.8.8".',
          answer: 'traceroute',
        },
        {
          type: 'tf',
          question: 'Extended ping on Cisco IOS allows you to specify the source IP address of the ping probes.',
          answer: true,
          explanation: 'Extended ping (entered by typing "ping" and pressing Enter without an argument) lets you specify source interface, repeat count, datagram size, and timeout — useful for testing specific paths and interfaces.',
        },
        {
          type: 'mcq',
          question: 'A "*" in Cisco traceroute output for a particular hop means what?',
          choices: [
            'The hop responded successfully',
            'No response was received within the timeout',
            'The destination was reached',
            'TTL was not decremented',
          ],
          answer: 'No response was received within the timeout',
        },
      ],
    },
    {
      id: 'l2',
      title: 'ARP Troubleshooting',
      icon: '🔎',
      questions: [
        {
          type: 'teach',
          title: 'ARP — Mapping IP to MAC',
          body: 'ARP (Address Resolution Protocol) resolves a known IPv4 address to an unknown MAC address on a local segment. A host broadcasts an ARP Request ("Who has 192.168.1.1?") and the owner unicasts an ARP Reply with its MAC address. The result is cached in the ARP table. On a Cisco router, view the ARP cache with "show arp" and clear a stale entry with "clear arp-cache".',
        },
        {
          type: 'teach',
          title: 'Proxy ARP and Common ARP Issues',
          body: 'Proxy ARP allows a router to respond to ARP requests on behalf of hosts in another subnet — the router replies with its own MAC address, and hosts send traffic to the router which then forwards it. Stale ARP entries cause connectivity drops when a device changes its MAC address (e.g. NIC replacement). Duplicate IP addresses also cause intermittent ARP conflicts visible in "show arp" as entries that flip between MAC addresses.',
        },
        {
          type: 'mcq',
          question: 'Which Cisco IOS command displays the ARP cache on a router?',
          choices: ['show arp', 'show mac address-table', 'show ip arp cache', 'debug arp'],
          answer: 'show arp',
        },
        {
          type: 'mcq',
          question: 'A host cannot reach its default gateway even though the IP address is correct. What ARP issue could cause this?',
          choices: [
            'The ARP cache has a stale MAC entry for the gateway',
            'ARP is disabled on the interface',
            'The gateway does not support ARP',
            'ARP only works on Layer 3 switches',
          ],
          answer: 'The ARP cache has a stale MAC entry for the gateway',
        },
        {
          type: 'tf',
          question: 'ARP requests are sent as unicast frames to the destination device.',
          answer: false,
          explanation: 'ARP requests are sent as broadcast frames (destination MAC FF:FF:FF:FF:FF:FF) because the sender does not yet know the destination MAC address. Only the ARP Reply is unicast.',
        },
        {
          type: 'mcq',
          question: 'What does Proxy ARP allow a router to do?',
          choices: [
            'Respond to ARP requests on behalf of hosts in another subnet',
            'Cache ARP entries for 24 hours',
            'Encrypt ARP traffic between VLANs',
            'Broadcast ARP requests across routed links',
          ],
          answer: 'Respond to ARP requests on behalf of hosts in another subnet',
        },
        {
          type: 'fill',
          question: 'The command to remove all entries from the ARP cache on a Cisco router is "clear _____".',
          answer: 'arp-cache',
        },
        {
          type: 'tf',
          question: 'A duplicate IP address on the network can cause intermittent ARP conflicts.',
          answer: true,
          explanation: 'When two devices share the same IP address, both respond to ARP requests. Hosts cache whichever reply arrived last, causing traffic to be sent alternately to each device — resulting in intermittent connectivity failures.',
        },
        {
          type: 'mcq',
          question: 'Which layer of the OSI model does ARP operate at?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 2',
        },
        {
          type: 'mcq',
          question: 'What information does an ARP Reply contain that an ARP Request does not?',
          choices: [
            'The destination IP address',
            'The sender\'s MAC address bound to the queried IP',
            'The subnet mask of the network',
            'The TTL of the entry',
          ],
          answer: 'The sender\'s MAC address bound to the queried IP',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Routing Table Problems',
      icon: '🗂️',
      questions: [
        {
          type: 'teach',
          title: 'Missing Routes and Recursive Lookups',
          body: 'The most common routing problem is a missing route — the destination is not in the table and there is no default route, so the packet is dropped. A recursive lookup occurs when a static route points to a next-hop IP that itself must be resolved through another routing table entry; if that entry disappears, the static route also disappears. Always verify the next-hop is reachable before assuming a static route is active.',
        },
        {
          type: 'teach',
          title: 'Interpreting Routing Failures',
          body: '"Destination host unreachable" means the local router has no route to the destination and returns an ICMP Unreachable message. "Request timed out" means packets were sent but no reply came back — possibly a one-way routing problem (return path missing) or a firewall dropping ICMP. Check both directions: outbound route and return route must both exist.',
        },
        {
          type: 'mcq',
          question: 'A ping returns "U" (ICMP Unreachable). What does this indicate?',
          choices: [
            'The source has no route to the destination',
            'An intermediate router has no route to the destination and sent back an ICMP Unreachable',
            'The destination host is powered off',
            'The ping TTL expired in transit',
          ],
          answer: 'An intermediate router has no route to the destination and sent back an ICMP Unreachable',
        },
        {
          type: 'mcq',
          question: 'Pings to a remote host time out (no response). The outbound route exists. What is the most likely cause?',
          choices: [
            'The outbound route has wrong AD',
            'The return path (route back to the source) is missing',
            'The destination interface is shutdown',
            'ARP is failing on the source',
          ],
          answer: 'The return path (route back to the source) is missing',
        },
        {
          type: 'tf',
          question: 'A recursive static route becomes invalid if the next-hop IP address disappears from the routing table.',
          answer: true,
          explanation: 'A recursive lookup means the router must resolve the next-hop IP via another route. If that resolving route is removed, the static route can no longer be used and is removed from the routing table.',
        },
        {
          type: 'mcq',
          question: 'Which command shows all routing table entries on a Cisco router?',
          choices: [
            'show ip interface brief',
            'show ip route',
            'show ip protocols',
            'show running-config',
          ],
          answer: 'show ip route',
        },
        {
          type: 'fill',
          question: 'When a router has no route to a destination and no default route, it _____ the packet.',
          answer: 'drops',
        },
        {
          type: 'mcq',
          question: 'You configured "ip route 10.0.0.0 255.0.0.0 192.168.1.254" but the route does not appear in the routing table. What is the most likely reason?',
          choices: [
            'The mask is incorrect',
            '192.168.1.254 is not reachable — recursive lookup fails',
            'Static routes require a process ID',
            'The destination is a class A network which is not supported',
          ],
          answer: '192.168.1.254 is not reachable — recursive lookup fails',
        },
        {
          type: 'tf',
          question: '"Destination host unreachable" and "Request timed out" indicate the same underlying problem.',
          answer: false,
          explanation: '"Destination host unreachable" is an ICMP Unreachable from a local or intermediate router (no route). "Request timed out" means the probe was sent but no reply arrived — often a return-path or firewall issue.',
        },
        {
          type: 'mcq',
          question: 'Which command verifies which routing protocols are running and their configured networks?',
          choices: ['show ip route', 'show ip protocols', 'show interfaces', 'show cdp neighbors'],
          answer: 'show ip protocols',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Interface Troubleshooting',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'Understanding Interface Status Codes',
          body: 'The command "show ip interface brief" shows two status columns for each interface: Line Status (Layer 1 physical) and Protocol Status (Layer 2). Four combinations matter: up/up = fully operational; up/down = Layer 1 OK but Layer 2 failing (encapsulation mismatch, keepalive failure); down/down = Layer 1 failure (cable, far end down); administratively down/down = manually shut down with the "shutdown" command.',
        },
        {
          type: 'teach',
          title: 'Reading show interfaces Output',
          body: '"show interfaces [interface]" gives detailed counters. Key fields: Input errors and CRC errors indicate Layer 1 noise or duplex mismatch; runts are frames smaller than 64 bytes (collision domain issues); giants exceed the MTU. A high input queue drop count suggests inbound bandwidth saturation. Resets and carrier transitions indicate physical instability. Always check "Last clearing of show interface counters" — old counters can be misleading.',
        },
        {
          type: 'mcq',
          question: 'An interface shows "up / down" in show ip interface brief. What does this indicate?',
          choices: [
            'The interface is fully operational',
            'Layer 1 is OK but Layer 2 is failing',
            'The interface is manually shut down',
            'The cable is unplugged',
          ],
          answer: 'Layer 1 is OK but Layer 2 is failing',
        },
        {
          type: 'mcq',
          question: 'An interface shows "administratively down / down". What caused this?',
          choices: [
            'A bad cable',
            'Encapsulation mismatch',
            'The "shutdown" command was applied',
            'The connected device is powered off',
          ],
          answer: 'The "shutdown" command was applied',
        },
        {
          type: 'tf',
          question: 'A high CRC error count on an interface typically indicates a duplex mismatch or Layer 1 noise.',
          answer: true,
          explanation: 'CRC errors occur when frames arrive with corrupted data. Common causes include electrical interference (bad cable, too long a run), or a duplex mismatch where one side is half-duplex causing collisions that corrupt frame bits.',
        },
        {
          type: 'mcq',
          question: 'What is the "down / down" status combination most likely caused by?',
          choices: [
            'The "shutdown" command',
            'Encapsulation mismatch',
            'Layer 1 failure such as an unplugged or broken cable',
            'Keepalive timeout',
          ],
          answer: 'Layer 1 failure such as an unplugged or broken cable',
        },
        {
          type: 'mcq',
          question: 'Which command shows per-interface packet counters including CRC errors and input drops?',
          choices: [
            'show ip interface brief',
            'show interfaces',
            'show ip route',
            'show cdp neighbors detail',
          ],
          answer: 'show interfaces',
        },
        {
          type: 'fill',
          question: 'The IOS command to re-enable a manually disabled interface is "no _____".',
          answer: 'shutdown',
        },
        {
          type: 'tf',
          question: 'Runt frames are larger than the maximum MTU and indicate an MTU mismatch.',
          answer: false,
          explanation: 'Runt frames are SMALLER than the minimum Ethernet frame size of 64 bytes, typically caused by collisions. Frames larger than the MTU are called giants.',
        },
        {
          type: 'mcq',
          question: 'A Serial interface shows "up / down". What is the most common cause on a back-to-back serial link?',
          choices: [
            'The cable is unplugged',
            'Encapsulation mismatch between the two ends',
            'The interface is administratively shut down',
            'OSPF neighbour state is stuck',
          ],
          answer: 'Encapsulation mismatch between the two ends',
        },
      ],
    },
  ],
};
