import type { Section } from '../../../lib/types';

export const SECTION_DHCP: Section = {
  id: 'dhcp',
  title: 'DHCP – Dynamic Host Configuration Protocol',
  icon: '📋',
  unlockAfter: 'inter-vlan-routing',
  lessons: [
    {
      id: 'l1',
      title: 'DHCP Fundamentals',
      icon: '📡',
      questions: [
        {
          type: 'teach',
          title: 'How DHCP Works — DORA',
          body: 'DHCP automatically assigns IP addresses and network parameters to clients using a four-step process called DORA: Discover (client broadcasts to find a server), Offer (server offers an IP address), Request (client requests the offered address), Acknowledge (server confirms the lease). DHCP uses UDP — client sends from port 68 to server port 67.',
        },
        {
          type: 'mcq',
          question: 'What does the acronym DORA stand for in DHCP?',
          choices: [
            'Discover, Offer, Request, Acknowledge',
            'Detect, Offer, Relay, Assign',
            'Discover, Order, Reserve, Assign',
            'Detect, Offer, Request, Allocate',
          ],
          answer: 'Discover, Offer, Request, Acknowledge',
        },
        {
          type: 'mcq',
          question: 'Which UDP port does a DHCP server listen on?',
          choices: ['53', '67', '68', '69'],
          answer: '67',
        },
        {
          type: 'tf',
          question: 'The DHCP Discover message is sent as a unicast to the DHCP server.',
          answer: false,
          explanation: 'The DHCP Discover is sent as a broadcast (255.255.255.255) because the client does not yet know the server\'s IP address. The server responds with a unicast or broadcast Offer.',
        },
        {
          type: 'mcq',
          question: 'Which DHCP parameter tells a client where to send traffic destined for remote networks?',
          choices: ['DNS server', 'Subnet mask', 'Default gateway', 'Lease time'],
          answer: 'Default gateway',
        },
        {
          type: 'fill',
          question: 'DHCP clients send requests from UDP port 68 to server UDP port _____.',
          answer: '67',
        },
        {
          type: 'tf',
          question: 'DHCP can assign IP addresses, subnet masks, default gateways, and DNS server addresses to clients.',
          answer: true,
          explanation: 'DHCP provides much more than just an IP address. A standard DHCP lease includes subnet mask, default gateway, DNS server(s), domain name, and lease duration — all automatically configured on the client.',
        },
        {
          type: 'mcq',
          question: 'In the DORA process, which step does the client send after receiving a DHCP Offer?',
          choices: ['Discover', 'Acknowledge', 'Request', 'Release'],
          answer: 'Request',
        },
        {
          type: 'mcq',
          question: 'What protocol does DHCP use at the transport layer?',
          choices: ['TCP', 'UDP', 'ICMP', 'ARP'],
          answer: 'UDP',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Cisco DHCP Server Configuration',
      icon: '⚙️',
      questions: [
        {
          type: 'teach',
          title: 'Configuring a DHCP Pool on IOS',
          body: 'Configure a DHCP pool with "ip dhcp pool [name]", then set the network with "network [ip] [mask]", default gateway with "default-router [ip]", and DNS with "dns-server [ip]". Exclude static addresses (routers, servers) with "ip dhcp excluded-address [start] [end]" in global config — always configure exclusions before the pool. Verify active leases with "show ip dhcp binding".',
        },
        {
          type: 'mcq',
          question: 'Which command excludes 192.168.1.1 through 192.168.1.10 from DHCP assignment?',
          choices: [
            'ip dhcp exclude 192.168.1.1 192.168.1.10',
            'ip dhcp excluded-address 192.168.1.1 192.168.1.10',
            'no dhcp 192.168.1.1 192.168.1.10',
            'dhcp exclude range 192.168.1.1 10',
          ],
          answer: 'ip dhcp excluded-address 192.168.1.1 192.168.1.10',
        },
        {
          type: 'mcq',
          question: 'Which command sets the default gateway in a DHCP pool?',
          choices: ['gateway', 'default-router', 'ip default-gateway', 'ip route'],
          answer: 'default-router',
        },
        {
          type: 'tf',
          question: 'DHCP excluded-address ranges should be configured before the DHCP pool.',
          answer: true,
          explanation: 'While IOS accepts exclusions in any order, best practice is to configure "ip dhcp excluded-address" before defining the pool to ensure those addresses are never assigned — especially important for router and server IPs.',
        },
        {
          type: 'mcq',
          question: 'Which command shows all current DHCP address assignments on a Cisco router?',
          choices: ['show dhcp lease', 'show ip dhcp binding', 'show ip dhcp pool', 'show dhcp clients'],
          answer: 'show ip dhcp binding',
        },
        {
          type: 'fill',
          question: 'The DHCP pool command to specify the DNS server is "dns-server _____".',
          answer: '[ip-address]',
        },
        {
          type: 'mcq',
          question: 'Which command enters DHCP pool configuration mode and names the pool "CORP"?',
          choices: ['dhcp pool CORP', 'ip dhcp pool CORP', 'pool dhcp CORP', 'ip pool CORP'],
          answer: 'ip dhcp pool CORP',
        },
        {
          type: 'tf',
          question: '"show ip dhcp pool" shows active client leases and their MAC addresses.',
          answer: false,
          explanation: '"show ip dhcp pool" shows pool configuration details and statistics (total/used/available addresses). Active leases with MAC addresses and expiry times are shown by "show ip dhcp binding".',
        },
        {
          type: 'mcq',
          question: 'Which command disables the Cisco IOS DHCP server entirely?',
          choices: ['no ip dhcp', 'no service dhcp', 'ip dhcp disable', 'no dhcp server'],
          answer: 'no service dhcp',
        },
      ],
    },
    {
      id: 'l3',
      title: 'DHCP Relay',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'Why DHCP Relay Is Needed',
          body: 'DHCP Discover messages are broadcasts — routers do not forward broadcasts by default. In a routed network where the DHCP server is in a different subnet, a relay agent (ip helper-address) is configured on the router interface facing the clients. The router intercepts the broadcast, converts it to a unicast, and forwards it to the DHCP server. The server replies unicast back to the relay, which forwards it to the client.',
        },
        {
          type: 'mcq',
          question: 'Which command configures a router interface to relay DHCP broadcasts to a server at 10.0.0.1?',
          choices: [
            'ip dhcp relay 10.0.0.1',
            'ip helper-address 10.0.0.1',
            'dhcp forward 10.0.0.1',
            'ip relay-agent 10.0.0.1',
          ],
          answer: 'ip helper-address 10.0.0.1',
        },
        {
          type: 'tf',
          question: 'By default, Cisco routers forward DHCP broadcast packets to other subnets.',
          answer: false,
          explanation: 'Routers do not forward Layer 2 or Layer 3 broadcasts by default. The "ip helper-address" command is required on the interface closest to the clients to relay DHCP broadcasts as unicasts to the DHCP server.',
        },
        {
          type: 'mcq',
          question: 'The "ip helper-address" command is configured on which interface?',
          choices: [
            'The interface connected to the DHCP server',
            'The interface facing the DHCP clients',
            'Any loopback interface',
            'The management interface',
          ],
          answer: 'The interface facing the DHCP clients',
        },
        {
          type: 'mcq',
          question: 'After the DHCP relay receives the client\'s broadcast Discover, how does it forward it to the server?',
          choices: ['As a broadcast', 'As a unicast', 'As a multicast', 'As an anycast'],
          answer: 'As a unicast',
        },
        {
          type: 'fill',
          question: 'The router command to relay DHCP to a central server is "ip _____-address [server-ip]".',
          answer: 'helper',
        },
        {
          type: 'tf',
          question: 'A single router interface can have multiple "ip helper-address" entries pointing to different servers.',
          answer: true,
          explanation: 'Multiple "ip helper-address" commands can be applied to the same interface to relay DHCP (and other UDP broadcasts) to multiple servers, providing redundancy.',
        },
        {
          type: 'mcq',
          question: 'Besides DHCP, which other protocols does "ip helper-address" forward by default on Cisco IOS?',
          choices: [
            'OSPF and EIGRP',
            'TFTP (UDP 69) and DNS (UDP 53)',
            'SSH and Telnet',
            'NTP and Syslog only',
          ],
          answer: 'TFTP (UDP 69) and DNS (UDP 53)',
        },
        {
          type: 'mcq',
          question: 'A client in VLAN 10 cannot get a DHCP address even though the server is reachable. Where should you first check for the relay config?',
          choices: [
            'On the DHCP server',
            'On the VLAN 10 SVI or the router interface facing VLAN 10 clients',
            'On the trunk link between switches',
            'On the DHCP pool configuration',
          ],
          answer: 'On the VLAN 10 SVI or the router interface facing VLAN 10 clients',
        },
      ],
    },
    {
      id: 'l4',
      title: 'DHCP Snooping',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'Rogue DHCP Servers and Snooping',
          body: 'A rogue DHCP server on the network can hand out incorrect IP addresses, wrong gateways, or malicious DNS servers — enabling man-in-the-middle attacks. DHCP snooping is a Layer 2 security feature on switches that classifies ports as trusted (uplinks to real DHCP servers/routers) or untrusted (client-facing ports). DHCP Offer/Ack messages from untrusted ports are dropped, blocking rogue servers.',
        },
        {
          type: 'mcq',
          question: 'What is the purpose of DHCP snooping?',
          choices: [
            'To speed up DHCP address assignment',
            'To block rogue DHCP servers on untrusted ports',
            'To relay DHCP between subnets',
            'To assign static IPs from the DHCP pool',
          ],
          answer: 'To block rogue DHCP servers on untrusted ports',
        },
        {
          type: 'mcq',
          question: 'Which command enables DHCP snooping for VLAN 10 on a switch?',
          choices: [
            'ip dhcp snooping',
            'ip dhcp snooping vlan 10',
            'dhcp snooping enable vlan 10',
            'switchport dhcp-snooping vlan 10',
          ],
          answer: 'ip dhcp snooping vlan 10',
        },
        {
          type: 'tf',
          question: 'Uplink ports connecting to a legitimate DHCP server should be configured as DHCP snooping trusted ports.',
          answer: true,
          explanation: 'Trusted ports allow DHCP Offer and Ack messages to pass — they should only be configured on uplinks to the actual DHCP server or router. All client-facing access ports should remain untrusted.',
        },
        {
          type: 'mcq',
          question: 'Which command marks a switch port as trusted for DHCP snooping?',
          choices: [
            'dhcp snooping trust',
            'ip dhcp snooping trust',
            'switchport dhcp trust',
            'ip dhcp trusted',
          ],
          answer: 'ip dhcp snooping trust',
        },
        {
          type: 'fill',
          question: 'DHCP snooping classifies switch ports as trusted or _____ to control which ports can send DHCP Offer messages.',
          answer: 'untrusted',
        },
        {
          type: 'tf',
          question: 'DHCP snooping also builds a binding table used by Dynamic ARP Inspection (DAI).',
          answer: true,
          explanation: 'The DHCP snooping binding table records IP-to-MAC-to-port mappings. Dynamic ARP Inspection (DAI) uses this table to validate ARP packets and prevent ARP spoofing attacks.',
        },
        {
          type: 'mcq',
          question: 'What happens to a DHCP Offer received on an untrusted DHCP snooping port?',
          choices: [
            'It is forwarded normally',
            'It is rate-limited',
            'It is dropped',
            'It is sent to the DHCP server for validation',
          ],
          answer: 'It is dropped',
        },
        {
          type: 'mcq',
          question: 'Which command shows the DHCP snooping binding table on a switch?',
          choices: [
            'show ip dhcp binding',
            'show ip dhcp snooping binding',
            'show dhcp snooping table',
            'show ip dhcp snooping',
          ],
          answer: 'show ip dhcp snooping binding',
        },
      ],
    },
  ],
};
