import type { Section } from '../../../lib/types';

export const SECTION_IPV6: Section = {
  id: 'ipv6',
  title: 'IPv6',
  icon: '🌐',
  unlockAfter: 'nat',
  lessons: [
    {
      id: 'l1',
      title: 'IPv6 Addressing',
      icon: '🔢',
      questions: [
        {
          type: 'teach',
          title: 'IPv6 Address Format',
          body: 'IPv6 uses 128-bit addresses written as eight groups of four hex digits separated by colons (e.g. 2001:0db8:0000:0000:0000:0000:0000:0001). Two shortening rules: leading zeros in each group can be omitted, and one consecutive run of all-zero groups can be replaced with "::" (used only once per address). /64 is the standard host prefix — the first 64 bits are the network prefix, the last 64 bits are the interface ID.',
        },
        {
          type: 'mcq',
          question: 'How many bits are in an IPv6 address?',
          choices: ['32', '64', '128', '256'],
          answer: '128',
        },
        {
          type: 'mcq',
          question: 'What is the standard subnet prefix length for IPv6 host subnets?',
          choices: ['/32', '/48', '/64', '/128'],
          answer: '/64',
        },
        {
          type: 'tf',
          question: 'The "::" abbreviation can be used multiple times in a single IPv6 address.',
          answer: false,
          explanation: 'The "::" shorthand can only be used once per address to replace one or more consecutive all-zero groups. Using it more than once would make the address ambiguous.',
        },
        {
          type: 'mcq',
          question: 'What is the expanded form of the IPv6 address 2001:db8::1?',
          choices: [
            '2001:0db8:0000:0000:0000:0000:0000:0001',
            '2001:db80:0000:0000:0000:0000:0000:0001',
            '2001:0db8:1:0:0:0:0:0',
            '2001:db8:0:0:0:0:0:1:0',
          ],
          answer: '2001:0db8:0000:0000:0000:0000:0000:0001',
        },
        {
          type: 'fill',
          question: 'IPv6 addresses are written in _____ (base-16) notation separated by colons.',
          answer: 'hexadecimal',
        },
        {
          type: 'mcq',
          question: 'What prefix range is used for IPv6 global unicast addresses (internet-routable)?',
          choices: ['FC00::/7', 'FE80::/10', 'FF00::/8', '2000::/3'],
          answer: '2000::/3',
        },
        {
          type: 'tf',
          question: 'A /128 IPv6 prefix identifies a single specific host interface.',
          answer: true,
          explanation: 'A /128 prefix means all 128 bits are fixed, identifying exactly one IPv6 address. This is equivalent to a /32 host route in IPv4.',
        },
      ],
    },
    {
      id: 'l2',
      title: 'IPv6 Address Types',
      icon: '🏷️',
      questions: [
        {
          type: 'teach',
          title: 'Unicast, Multicast, and Anycast',
          body: 'IPv6 has three address types: Unicast (one-to-one), Multicast (one-to-many, FF00::/8), and Anycast (one-to-nearest). IPv6 has NO broadcast. Link-local addresses (FE80::/10) are automatically assigned to every interface and are only valid on the local link — required for NDP and routing protocols. Unique local addresses (FC00::/7) are IPv6\'s equivalent of private RFC 1918 addresses.',
        },
        {
          type: 'mcq',
          question: 'Which IPv6 address type replaces IPv4 broadcast?',
          choices: ['Anycast', 'Unicast', 'Multicast', 'IPv6 has no broadcast equivalent'],
          answer: 'Multicast',
        },
        {
          type: 'mcq',
          question: 'What is the prefix for IPv6 link-local addresses?',
          choices: ['FC00::/7', 'FE80::/10', 'FF00::/8', '2001::/32'],
          answer: 'FE80::/10',
        },
        {
          type: 'tf',
          question: 'Every IPv6-enabled interface automatically generates a link-local address.',
          answer: true,
          explanation: 'Link-local addresses (FE80::/10) are mandatory on every IPv6 interface. They are automatically derived from the interface MAC address using EUI-64 or generated randomly, and are required for NDP and routing protocol operations.',
        },
        {
          type: 'mcq',
          question: 'Which IPv6 address type is equivalent to RFC 1918 private addresses?',
          choices: ['Link-local (FE80::/10)', 'Unique local (FC00::/7)', 'Multicast (FF00::/8)', 'Loopback (::1)'],
          answer: 'Unique local (FC00::/7)',
        },
        {
          type: 'fill',
          question: 'The IPv6 loopback address is _____.',
          answer: '::1',
        },
        {
          type: 'mcq',
          question: 'What is the IPv6 multicast address for all routers on the local link?',
          choices: ['FF02::1', 'FF02::2', 'FF02::5', 'FE80::1'],
          answer: 'FF02::2',
        },
        {
          type: 'tf',
          question: 'IPv6 anycast packets are delivered to the nearest interface with that anycast address.',
          answer: true,
          explanation: 'Anycast assigns the same address to multiple interfaces. Packets sent to an anycast address are routed to whichever interface is topologically closest, useful for load-balanced services.',
        },
        {
          type: 'mcq',
          question: 'What is the IPv6 multicast address for all nodes on the local link?',
          choices: ['FF02::1', 'FF02::2', 'FF02::5', 'FF02::9'],
          answer: 'FF02::1',
        },
      ],
    },
    {
      id: 'l3',
      title: 'EUI-64 and NDP',
      icon: '🔎',
      questions: [
        {
          type: 'teach',
          title: 'EUI-64 Interface ID and NDP',
          body: 'EUI-64 generates a 64-bit interface ID from a 48-bit MAC address: split the MAC in half, insert FFFE in the middle, and flip the 7th bit (U/L bit) of the first byte. IPv6 uses Neighbor Discovery Protocol (NDP) instead of ARP. NDP uses ICMPv6: Neighbor Solicitation (NS) and Neighbor Advertisement (NA) for address resolution, and Router Advertisement (RA) / Router Solicitation (RS) for prefix discovery.',
        },
        {
          type: 'mcq',
          question: 'What is inserted into the middle of a MAC address when generating an EUI-64 interface ID?',
          choices: ['FF:FE', 'FE:FF', '00:00', 'FF:FF'],
          answer: 'FF:FE',
        },
        {
          type: 'mcq',
          question: 'Which IPv6 protocol replaces ARP for address resolution?',
          choices: ['DHCPv6', 'NDP (Neighbor Discovery Protocol)', 'ICMPv6 Echo', 'SLAAC'],
          answer: 'NDP (Neighbor Discovery Protocol)',
        },
        {
          type: 'tf',
          question: 'IPv6 uses broadcast-based ARP for Layer 2 address resolution.',
          answer: false,
          explanation: 'IPv6 completely replaces ARP with NDP (Neighbor Discovery Protocol), which uses ICMPv6 multicast messages (Neighbor Solicitation/Advertisement) instead of broadcasts.',
        },
        {
          type: 'mcq',
          question: 'Which NDP message type does a host send to discover the MAC address of another IPv6 host?',
          choices: ['Router Solicitation', 'Neighbor Advertisement', 'Neighbor Solicitation', 'Router Advertisement'],
          answer: 'Neighbor Solicitation',
        },
        {
          type: 'fill',
          question: 'In EUI-64, the 7th bit of the first MAC byte is flipped — this is called the _____ bit.',
          answer: 'U/L',
        },
        {
          type: 'mcq',
          question: 'Which NDP message type does a router send to announce its presence and prefix information?',
          choices: ['Neighbor Solicitation', 'Neighbor Advertisement', 'Router Solicitation', 'Router Advertisement'],
          answer: 'Router Advertisement',
        },
        {
          type: 'tf',
          question: 'SLAAC allows a host to configure its own IPv6 address using Router Advertisements without a DHCPv6 server.',
          answer: true,
          explanation: 'Stateless Address Autoconfiguration (SLAAC) lets hosts create their own global unicast address by combining the /64 prefix from a Router Advertisement with a self-generated EUI-64 interface ID.',
        },
      ],
    },
    {
      id: 'l4',
      title: 'IPv6 on Cisco Routers',
      icon: '⚙️',
      questions: [
        {
          type: 'teach',
          title: 'Configuring IPv6 on IOS',
          body: 'Enable IPv6 routing globally with "ipv6 unicast-routing". Assign an address with "ipv6 address [address/prefix-len]" or use EUI-64 with "ipv6 address [prefix/64] eui-64". Static IPv6 routes use "ipv6 route [prefix/len] [next-hop]". The IPv6 default route is "::/0". Verify with "show ipv6 interface brief" and "show ipv6 route".',
        },
        {
          type: 'mcq',
          question: 'Which command enables IPv6 routing on a Cisco router?',
          choices: ['ip routing ipv6', 'ipv6 unicast-routing', 'ipv6 routing enable', 'ip ipv6 routing'],
          answer: 'ipv6 unicast-routing',
        },
        {
          type: 'mcq',
          question: 'Which command assigns 2001:db8:1::1/64 to interface Gi0/0?',
          choices: [
            'ip address 2001:db8:1::1 64',
            'ipv6 address 2001:db8:1::1/64',
            'ip ipv6 address 2001:db8:1::1/64',
            'ipv6 2001:db8:1::1 prefix 64',
          ],
          answer: 'ipv6 address 2001:db8:1::1/64',
        },
        {
          type: 'tf',
          question: 'Without "ipv6 unicast-routing", a Cisco router will not forward IPv6 packets between interfaces.',
          answer: true,
          explanation: '"ipv6 unicast-routing" enables IPv6 routing globally. Without it, the router can have IPv6 addresses but will not route IPv6 packets between interfaces.',
        },
        {
          type: 'mcq',
          question: 'Which command configures Gi0/0 with a /64 prefix using EUI-64 for the interface ID?',
          choices: [
            'ipv6 address 2001:db8::/64 eui-64',
            'ipv6 address 2001:db8:: eui-64 /64',
            'ipv6 eui-64 2001:db8::/64',
            'ipv6 address 2001:db8:1::/64 eui64',
          ],
          answer: 'ipv6 address 2001:db8::/64 eui-64',
        },
        {
          type: 'fill',
          question: 'An IPv6 default static route is configured as "ipv6 route _____ [next-hop]".',
          answer: '::/0',
        },
        {
          type: 'mcq',
          question: 'Which command shows IPv6 addresses on all interfaces in a brief format?',
          choices: ['show ip interface brief', 'show ipv6 interface brief', 'show ipv6 addresses', 'show interfaces ipv6'],
          answer: 'show ipv6 interface brief',
        },
        {
          type: 'tf',
          question: 'OSPFv2 can be used for IPv6 routing.',
          answer: false,
          explanation: 'OSPFv2 only supports IPv4. IPv6 dynamic routing requires OSPFv3 or EIGRP for IPv6.',
        },
        {
          type: 'mcq',
          question: 'Which command shows the IPv6 routing table on a Cisco router?',
          choices: ['show ip route ipv6', 'show ipv6 route', 'show route ipv6', 'show ip routing ipv6'],
          answer: 'show ipv6 route',
        },
      ],
    },
  ],
};
