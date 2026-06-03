import type { Section } from '../../../lib/types';

export const SECTION_STP: Section = {
  id: 'stp',
  title: 'STP – Spanning Tree Protocol',
  icon: '🌲',
  unlockAfter: 'hsrp',
  lessons: [
    {
      id: 'l1',
      title: 'Why STP Exists',
      icon: '🔄',
      questions: [
        {
          type: 'teach',
          title: 'Broadcast Storms and Layer 2 Loops',
          body: 'Without loop prevention, redundant switch links create broadcast storms — a broadcast frame is forwarded endlessly around the loop, consuming all bandwidth and crashing the network within seconds. Additionally, switches learn incorrect MAC addresses as frames arrive on multiple ports. STP (IEEE 802.1D) solves this by logically blocking redundant paths while keeping them as physical backups.',
        },
        {
          type: 'mcq',
          question: 'What catastrophic event occurs when a Layer 2 loop exists in a switched network?',
          choices: [
            'Routing table instability',
            'Broadcast storm — frames loop indefinitely, consuming all bandwidth',
            'Duplicate IP address assignment',
            'STP root bridge election failure',
          ],
          answer: 'Broadcast storm — frames loop indefinitely, consuming all bandwidth',
        },
        {
          type: 'tf',
          question: 'STP prevents Layer 2 loops by logically blocking redundant switch ports.',
          answer: true,
          explanation: 'STP keeps physically redundant links but places some ports in a Blocking state so no loop exists in the active topology. If the active path fails, the blocked port transitions to Forwarding.',
        },
        {
          type: 'mcq',
          question: 'Which IEEE standard defines the original Spanning Tree Protocol?',
          choices: ['802.1Q', '802.1D', '802.1W', '802.3ad'],
          answer: '802.1D',
        },
        {
          type: 'mcq',
          question: 'What is the MAC address instability problem caused by a Layer 2 loop?',
          choices: [
            'Switches learn multiple MAC addresses on one port',
            'A MAC address appears on multiple ports simultaneously, causing constant MAC table updates',
            'The MAC table overflows and switches flood all traffic',
            'MAC addresses expire too quickly',
          ],
          answer: 'A MAC address appears on multiple ports simultaneously, causing constant MAC table updates',
        },
        {
          type: 'fill',
          question: 'Without STP, a broadcast frame on a looped network will circulate forever — this is called a broadcast _____.',
          answer: 'storm',
        },
        {
          type: 'tf',
          question: 'STP completely removes redundant physical links from the network.',
          answer: false,
          explanation: 'STP keeps the physical redundant links in place but logically blocks them. If the primary path fails, the blocked link can quickly transition to forwarding, restoring connectivity.',
        },
        {
          type: 'mcq',
          question: 'STP uses which type of message to communicate between switches?',
          choices: ['Hello packets', 'Bridge Protocol Data Units (BPDUs)', 'LSAs', 'VTP advertisements'],
          answer: 'Bridge Protocol Data Units (BPDUs)',
        },
      ],
    },
    {
      id: 'l2',
      title: 'STP Port Roles & Root Election',
      icon: '🏆',
      questions: [
        {
          type: 'teach',
          title: 'Root Bridge Election',
          body: 'STP elects one switch as the Root Bridge — the reference point for the entire spanning tree. The switch with the lowest Bridge ID wins. The Bridge ID is an 8-byte value composed of a 2-byte priority (default 32768) plus the switch MAC address. Ties in priority are broken by the lowest MAC address. Control which switch is root with "spanning-tree vlan [id] priority [value]" — lower priority wins.',
        },
        {
          type: 'teach',
          title: 'STP Port Roles',
          body: 'After root election: Root Port (RP) — the best path toward the root bridge on each non-root switch (one per switch). Designated Port (DP) — the port on each segment that forwards traffic toward the root (one per segment). Non-Designated Port (Alternate Port) — all other redundant ports, placed in Blocking state. All root bridge ports are designated ports.',
        },
        {
          type: 'mcq',
          question: 'How is the Root Bridge selected in STP?',
          choices: [
            'The switch with the highest MAC address',
            'The switch with the lowest Bridge ID (priority + MAC)',
            'The switch with the most ports',
            'The switch configured as VTP server',
          ],
          answer: 'The switch with the lowest Bridge ID (priority + MAC)',
        },
        {
          type: 'mcq',
          question: 'What is the default STP bridge priority?',
          choices: ['0', '4096', '32768', '65535'],
          answer: '32768',
        },
        {
          type: 'tf',
          question: 'Every non-root switch has exactly one Root Port.',
          answer: true,
          explanation: 'The Root Port is the port on a non-root switch that provides the best path to the Root Bridge. There is exactly one Root Port per non-root switch, selected based on lowest root path cost.',
        },
        {
          type: 'mcq',
          question: 'What is the STP port role for a redundant port that is placed in Blocking state?',
          choices: ['Root Port', 'Designated Port', 'Non-Designated (Alternate) Port', 'Backup Port'],
          answer: 'Non-Designated (Alternate) Port',
        },
        {
          type: 'mcq',
          question: 'Which command forces a switch to become the STP root for VLAN 1?',
          choices: [
            'spanning-tree vlan 1 root primary',
            'spanning-tree vlan 1 priority 0',
            'Both of the above',
            'stp root vlan 1',
          ],
          answer: 'Both of the above',
        },
        {
          type: 'fill',
          question: 'STP bridge priority must be set in increments of _____ (e.g. 4096, 8192).',
          answer: '4096',
        },
        {
          type: 'tf',
          question: 'All ports on the Root Bridge are in Designated Port role.',
          answer: true,
          explanation: 'The Root Bridge is the reference point — all its ports provide the best path toward the root for their respective segments, so all root bridge ports are Designated Ports.',
        },
        {
          type: 'mcq',
          question: 'STP path cost is based on what?',
          choices: ['Hop count', 'Interface bandwidth', 'IP address', 'VLAN ID'],
          answer: 'Interface bandwidth',
        },
      ],
    },
    {
      id: 'l3',
      title: 'STP Port States & RSTP',
      icon: '⚡',
      questions: [
        {
          type: 'teach',
          title: '802.1D Port States and Convergence',
          body: 'Original STP (802.1D) port states: Blocking (receiving BPDUs, not forwarding) → Listening (sending/receiving BPDUs, no forwarding, 15 sec) → Learning (learning MACs, no forwarding, 15 sec) → Forwarding (normal operation). Total convergence time after a failure is ~30–50 seconds. This is why RSTP was developed.',
        },
        {
          type: 'teach',
          title: 'RSTP — Rapid Spanning Tree',
          body: 'RSTP (802.1W, now merged into 802.1D-2004) converges in under 1 second using a proposal/agreement handshake instead of fixed timers. RSTP port states are Discarding, Learning, and Forwarding. New port roles: Alternate Port (backup to root port) and Backup Port (backup to designated port). Cisco\'s Per-VLAN Rapid STP (PVRSTP+) runs RSTP per VLAN.',
        },
        {
          type: 'mcq',
          question: 'How long does the Listening state last in original 802.1D STP?',
          choices: ['5 seconds', '10 seconds', '15 seconds', '30 seconds'],
          answer: '15 seconds',
        },
        {
          type: 'mcq',
          question: 'What is the approximate total convergence time for original 802.1D STP after a topology change?',
          choices: ['Under 1 second', '5–10 seconds', '30–50 seconds', '90 seconds'],
          answer: '30–50 seconds',
        },
        {
          type: 'tf',
          question: 'RSTP converges faster than 802.1D STP by using a proposal/agreement mechanism instead of fixed timers.',
          answer: true,
          explanation: 'RSTP negotiates port transitions directly between neighbouring switches using proposal/agreement BPDUs. This allows edge ports to go directly to Forwarding and inter-switch links to converge in under a second.',
        },
        {
          type: 'mcq',
          question: 'Which STP variant runs a separate spanning tree instance per VLAN on Cisco switches?',
          choices: ['802.1D', 'RSTP (802.1W)', 'PVST+ / Rapid PVST+', 'MST'],
          answer: 'PVST+ / Rapid PVST+',
        },
        {
          type: 'mcq',
          question: 'What are the three port states in RSTP?',
          choices: [
            'Blocking, Listening, Forwarding',
            'Discarding, Learning, Forwarding',
            'Blocking, Learning, Forwarding',
            'Down, Init, Forwarding',
          ],
          answer: 'Discarding, Learning, Forwarding',
        },
        {
          type: 'fill',
          question: 'RSTP is defined by IEEE standard 802.1_____.',
          answer: 'W',
        },
        {
          type: 'tf',
          question: 'An RSTP edge port (PortFast) immediately transitions to Forwarding when it comes up.',
          answer: true,
          explanation: 'Edge ports (PortFast in Cisco terminology) are connected to end hosts, not other switches. They skip STP negotiation and go straight to Forwarding, eliminating the 30-second delay for end device connectivity.',
        },
        {
          type: 'mcq',
          question: 'Which Cisco feature should be enabled on access ports connected to end hosts to bypass STP listening/learning delays?',
          choices: ['BPDU Guard', 'PortFast', 'Root Guard', 'Loop Guard'],
          answer: 'PortFast',
        },
      ],
    },
    {
      id: 'l4',
      title: 'STP Security & Verification',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'BPDU Guard and Root Guard',
          body: 'BPDU Guard shuts down a PortFast-enabled access port if it receives a BPDU — this prevents a rogue switch from being connected to an access port and affecting the STP topology. Root Guard prevents a port from becoming a Root Port — if a superior BPDU is received, the port is placed in root-inconsistent (blocking) state. Enable BPDU Guard with "spanning-tree bpduguard enable" per interface or globally with "spanning-tree portfast bpduguard default".',
        },
        {
          type: 'mcq',
          question: 'What does BPDU Guard do when a BPDU is received on a PortFast port?',
          choices: [
            'Ignores the BPDU',
            'Shuts the port down (err-disabled)',
            'Transitions the port to STP blocking state',
            'Sends an SNMP trap only',
          ],
          answer: 'Shuts the port down (err-disabled)',
        },
        {
          type: 'mcq',
          question: 'Which STP protection feature prevents a port from becoming the Root Port when it receives a superior BPDU?',
          choices: ['BPDU Guard', 'Root Guard', 'Loop Guard', 'PortFast'],
          answer: 'Root Guard',
        },
        {
          type: 'tf',
          question: 'PortFast should be enabled on trunk ports connecting to other switches.',
          answer: false,
          explanation: 'PortFast is designed exclusively for access ports connected to end hosts. Enabling it on trunk ports risks creating loops since the port would bypass STP negotiation when the connected switch comes up.',
        },
        {
          type: 'mcq',
          question: 'Which command shows STP port roles and states for all VLANs on a switch?',
          choices: [
            'show spanning-tree',
            'show stp brief',
            'show spanning-tree summary',
            'show interfaces stp',
          ],
          answer: 'show spanning-tree',
        },
        {
          type: 'fill',
          question: 'The interface command to enable BPDU Guard on a single port is "spanning-tree bpduguard _____".',
          answer: 'enable',
        },
        {
          type: 'mcq',
          question: 'A switch port is in err-disabled state after BPDU Guard triggered. How do you recover it?',
          choices: [
            'shutdown then no shutdown on the interface',
            'clear spanning-tree err-disabled',
            'spanning-tree portfast disable',
            'It recovers automatically after 30 seconds',
          ],
          answer: 'shutdown then no shutdown on the interface',
        },
        {
          type: 'tf',
          question: '"show spanning-tree vlan 10" shows the root bridge, local bridge ID, and port states for VLAN 10.',
          answer: true,
          explanation: 'The command displays the root bridge ID, local bridge ID, root path cost, and the role/state/cost of each port participating in STP for that specific VLAN.',
        },
        {
          type: 'mcq',
          question: 'Which command enables PortFast and BPDU Guard globally on all access ports?',
          choices: [
            'spanning-tree portfast default',
            'spanning-tree portfast bpduguard default',
            'spanning-tree bpduguard global',
            'spanning-tree portfast enable global',
          ],
          answer: 'spanning-tree portfast bpduguard default',
        },
      ],
    },
  ],
};
