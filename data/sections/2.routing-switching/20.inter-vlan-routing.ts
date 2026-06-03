import type { Section } from '../../../lib/types';

export const SECTION_INTER_VLAN_ROUTING: Section = {
  id: 'inter-vlan-routing',
  title: 'Inter-VLAN Routing',
  icon: '🔁',
  unlockAfter: 'vlans',
  lessons: [
    {
      id: 'l1',
      title: 'Legacy Inter-VLAN Routing',
      icon: '🖥️',
      questions: [
        {
          type: 'teach',
          title: 'One Interface Per VLAN',
          body: 'The original inter-VLAN routing method connects a separate physical router interface to each VLAN. Each interface gets an IP address in that VLAN\'s subnet and acts as the default gateway for hosts in that VLAN. This approach is simple but does not scale — a network with 50 VLANs would need 50 router interfaces, which is impractical on most routers.',
        },
        {
          type: 'mcq',
          question: 'What is the main limitation of legacy inter-VLAN routing (one physical interface per VLAN)?',
          choices: [
            'It requires a Layer 3 switch',
            'It does not support 802.1Q tagging',
            'It does not scale — each VLAN needs a dedicated physical interface',
            'It only works with OSPF',
          ],
          answer: 'It does not scale — each VLAN needs a dedicated physical interface',
        },
        {
          type: 'tf',
          question: 'In legacy inter-VLAN routing, each router interface connected to a VLAN acts as the default gateway for that VLAN.',
          answer: true,
          explanation: 'Each physical interface is assigned an IP address in the corresponding VLAN subnet and hosts in that VLAN point to it as their default gateway.',
        },
        {
          type: 'mcq',
          question: 'How many physical router interfaces would legacy inter-VLAN routing require for a 10-VLAN network?',
          choices: ['1', '2', '10', '20'],
          answer: '10',
        },
        {
          type: 'mcq',
          question: 'In legacy inter-VLAN routing, switch ports connecting to the router are configured as which port type?',
          choices: ['Trunk ports', 'Access ports (one per VLAN)', 'Routed ports', 'EtherChannel ports'],
          answer: 'Access ports (one per VLAN)',
        },
        {
          type: 'tf',
          question: 'Legacy inter-VLAN routing uses 802.1Q trunk links between the switch and router.',
          answer: false,
          explanation: 'Legacy inter-VLAN routing uses separate access ports — one per VLAN — not a trunk link. The trunk-based approach is called router-on-a-stick.',
        },
        {
          type: 'fill',
          question: 'Legacy inter-VLAN routing requires one physical _____ interface per VLAN on the router.',
          answer: 'interface',
        },
        {
          type: 'mcq',
          question: 'Which inter-VLAN routing method replaced legacy routing to reduce the number of physical connections needed?',
          choices: ['SVI routing', 'Router-on-a-stick', 'VLAN bridging', 'Proxy ARP routing'],
          answer: 'Router-on-a-stick',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Router-on-a-Stick',
      icon: '🥢',
      questions: [
        {
          type: 'teach',
          title: 'Subinterfaces and 802.1Q Encapsulation',
          body: 'Router-on-a-stick uses a single physical trunk link between the switch and router. The router interface is divided into logical subinterfaces — one per VLAN. Each subinterface is configured with "encapsulation dot1Q [vlan-id]" to tag/untag frames for that VLAN, and an IP address as the default gateway. Subinterfaces are named with dot notation: Gi0/0.10 for VLAN 10.',
        },
        {
          type: 'mcq',
          question: 'Which command configures a subinterface to handle VLAN 10 traffic?',
          choices: [
            'vlan encapsulation 10',
            'encapsulation dot1Q 10',
            'switchport access vlan 10',
            'ip vlan 10',
          ],
          answer: 'encapsulation dot1Q 10',
        },
        {
          type: 'mcq',
          question: 'In router-on-a-stick, how is the physical interface between the switch and router configured on the switch?',
          choices: ['Access port for VLAN 1', 'Trunk port', 'Routed port', 'EtherChannel'],
          answer: 'Trunk port',
        },
        {
          type: 'tf',
          question: 'Router-on-a-stick uses multiple physical links between the switch and router — one per VLAN.',
          answer: false,
          explanation: 'Router-on-a-stick uses a SINGLE physical trunk link. Multiple logical subinterfaces on the router handle each VLAN, removing the need for multiple physical connections.',
        },
        {
          type: 'mcq',
          question: 'What is the subinterface name convention for VLAN 20 on Gi0/0?',
          choices: ['Gi0/0:20', 'Gi0/0.20', 'Gi0/0-vlan20', 'Gi0/0/20'],
          answer: 'Gi0/0.20',
        },
        {
          type: 'fill',
          question: 'The command to set the native VLAN on a router subinterface is "encapsulation dot1Q [id] _____".',
          answer: 'native',
        },
        {
          type: 'mcq',
          question: 'What is the main drawback of router-on-a-stick compared to Layer 3 switch SVIs?',
          choices: [
            'It requires more VLANs',
            'The single physical link can become a bandwidth bottleneck',
            'It does not support 802.1Q',
            'It only works with EIGRP',
          ],
          answer: 'The single physical link can become a bandwidth bottleneck',
        },
        {
          type: 'tf',
          question: 'Each router subinterface in router-on-a-stick must be assigned an IP address as the default gateway for its VLAN.',
          answer: true,
          explanation: 'Each subinterface acts as the Layer 3 gateway for its VLAN. Hosts in that VLAN are configured with the subinterface IP as their default gateway.',
        },
        {
          type: 'mcq',
          question: 'Which two commands are required on a router subinterface for inter-VLAN routing?',
          choices: [
            'encapsulation dot1Q and ip address',
            'switchport mode trunk and ip address',
            'vlan and ip route',
            'ip ospf and encapsulation',
          ],
          answer: 'encapsulation dot1Q and ip address',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Layer 3 Switch SVIs',
      icon: '🔀',
      questions: [
        {
          type: 'teach',
          title: 'Switched Virtual Interfaces',
          body: 'A Layer 3 switch can route between VLANs internally using Switched Virtual Interfaces (SVIs). Create an SVI with "interface vlan [id]" and assign it an IP address — this becomes the default gateway for that VLAN. Enable routing on the switch with the global command "ip routing". SVIs use the switch\'s backplane for inter-VLAN traffic, far outperforming router-on-a-stick which is limited by a single physical link.',
        },
        {
          type: 'mcq',
          question: 'Which command enables IP routing on a Layer 3 switch?',
          choices: ['routing enable', 'ip routing', 'ip route enable', 'layer3 routing on'],
          answer: 'ip routing',
        },
        {
          type: 'mcq',
          question: 'Which command creates an SVI for VLAN 10?',
          choices: ['vlan interface 10', 'interface vlan 10', 'ip svi vlan 10', 'svi 10'],
          answer: 'interface vlan 10',
        },
        {
          type: 'tf',
          question: 'SVIs on a Layer 3 switch can act as the default gateway for hosts in a VLAN.',
          answer: true,
          explanation: 'An SVI is a virtual Layer 3 interface representing a VLAN on the switch. Assigning an IP address to it and enabling "ip routing" makes the switch capable of routing between VLANs without an external router.',
        },
        {
          type: 'mcq',
          question: 'What is the main performance advantage of SVIs over router-on-a-stick?',
          choices: [
            'SVIs use more physical interfaces',
            'Inter-VLAN routing happens on the switch backplane at hardware speed',
            'SVIs support more VLANs',
            'SVIs do not require 802.1Q',
          ],
          answer: 'Inter-VLAN routing happens on the switch backplane at hardware speed',
        },
        {
          type: 'fill',
          question: 'An SVI for VLAN 10 is created with the command "interface _____ 10".',
          answer: 'vlan',
        },
        {
          type: 'tf',
          question: 'A Layer 2 switch can perform inter-VLAN routing using SVIs.',
          answer: false,
          explanation: 'Layer 2 switches do not support IP routing. SVIs on a Layer 2 switch can only have one IP address for management purposes. A Layer 3 switch with "ip routing" enabled is required for inter-VLAN routing via SVIs.',
        },
        {
          type: 'mcq',
          question: 'Which inter-VLAN routing method is preferred in enterprise networks due to performance and scalability?',
          choices: ['Legacy (one interface per VLAN)', 'Router-on-a-stick', 'Layer 3 switch SVIs', 'Proxy ARP'],
          answer: 'Layer 3 switch SVIs',
        },
        {
          type: 'mcq',
          question: 'For an SVI to be active (up/up), what must be true?',
          choices: [
            'The VLAN must exist and have at least one active access port',
            'ip routing must be disabled',
            'The switch must be a VTP server',
            'A trunk port must be connected to the SVI',
          ],
          answer: 'The VLAN must exist and have at least one active access port',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Verification & Troubleshooting',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Verifying Inter-VLAN Routing',
          body: 'Use "show ip route" to confirm the Layer 3 switch or router has connected routes for each VLAN subnet. Use "show interfaces trunk" to verify the trunk link is up and carrying the correct VLANs. Use "show interfaces vlan [id]" to check SVI state. Test connectivity with ping from a host in one VLAN to a host in another — if it fails, check the default gateway, IP routing, and VLAN membership.',
        },
        {
          type: 'mcq',
          question: 'Hosts in VLAN 10 cannot ping hosts in VLAN 20. The SVIs are up. What should you check first?',
          choices: [
            'Whether CDP is enabled',
            'Whether "ip routing" is enabled on the Layer 3 switch',
            'Whether OSPF is running',
            'Whether the trunk native VLAN matches',
          ],
          answer: 'Whether "ip routing" is enabled on the Layer 3 switch',
        },
        {
          type: 'mcq',
          question: 'Which command verifies that a trunk is carrying the expected VLANs?',
          choices: [
            'show vlan brief',
            'show interfaces trunk',
            'show ip interface brief',
            'show cdp neighbors',
          ],
          answer: 'show interfaces trunk',
        },
        {
          type: 'tf',
          question: 'An SVI will be "up/down" if the VLAN does not exist in the switch\'s VLAN database.',
          answer: true,
          explanation: 'An SVI requires the corresponding VLAN to exist and to have at least one active port. If the VLAN is missing or all ports are down, the SVI will show as up/down.',
        },
        {
          type: 'mcq',
          question: 'A router-on-a-stick subinterface is down. The physical interface is up. What is the most likely cause?',
          choices: [
            'The encapsulation dot1Q statement is missing or has the wrong VLAN ID',
            'The IP address is wrong',
            'The trunk is using ISL instead of 802.1Q',
            'STP is blocking the subinterface',
          ],
          answer: 'The encapsulation dot1Q statement is missing or has the wrong VLAN ID',
        },
        {
          type: 'fill',
          question: 'The command to check the state and IP address of VLAN 10\'s SVI is "show interfaces _____ 10".',
          answer: 'vlan',
        },
        {
          type: 'tf',
          question: 'A host with the wrong default gateway can still communicate with hosts in the same VLAN.',
          answer: true,
          explanation: 'Same-VLAN communication is Layer 2 — it uses MAC addresses and the ARP process, not the default gateway. The default gateway is only needed when traffic must be sent to a different subnet (inter-VLAN or external).',
        },
        {
          type: 'mcq',
          question: 'Which command shows connected routes for each VLAN subnet on a Layer 3 switch?',
          choices: ['show vlan brief', 'show ip route', 'show interfaces vlan', 'show ip protocols'],
          answer: 'show ip route',
        },
      ],
    },
  ],
};
