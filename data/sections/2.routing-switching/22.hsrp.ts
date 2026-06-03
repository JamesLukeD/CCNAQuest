import type { Section } from '../../../lib/types';

export const SECTION_HSRP: Section = {
  id: 'hsrp',
  title: 'HSRP – Hot Standby Router Protocol',
  icon: '🔄',
  unlockAfter: 'dhcp',
  lessons: [
    {
      id: 'l1',
      title: 'FHRP Concepts',
      icon: '🔁',
      questions: [
        {
          type: 'teach',
          title: 'Why First Hop Redundancy Matters',
          body: 'Hosts are configured with a single default gateway. If that gateway router fails, all hosts lose connectivity to remote networks — even if a backup router exists. First Hop Redundancy Protocols (FHRPs) solve this by presenting a virtual IP address shared between two or more routers. One router is active (forwarding traffic), the other is standby (ready to take over). Hosts always point to the virtual IP, never noticing a failover.',
        },
        {
          type: 'mcq',
          question: 'What problem do First Hop Redundancy Protocols (FHRPs) solve?',
          choices: [
            'Routing loops between routers',
            'Single point of failure for the default gateway',
            'Slow convergence of OSPF',
            'Duplicate IP address conflicts',
          ],
          answer: 'Single point of failure for the default gateway',
        },
        {
          type: 'mcq',
          question: 'Which of the following are FHRPs? (choose the best answer)',
          choices: [
            'OSPF and EIGRP',
            'HSRP, VRRP, and GLBP',
            'STP and RSTP',
            'CDP and LLDP',
          ],
          answer: 'HSRP, VRRP, and GLBP',
        },
        {
          type: 'tf',
          question: 'In an FHRP setup, hosts point their default gateway to the virtual IP address shared by the routers.',
          answer: true,
          explanation: 'The virtual IP is the stable address that never changes — even during failover. Hosts are configured with this virtual IP as their default gateway, so they are unaffected when the active router changes.',
        },
        {
          type: 'mcq',
          question: 'Which FHRP is Cisco-proprietary?',
          choices: ['VRRP', 'GLBP', 'HSRP', 'Both HSRP and GLBP'],
          answer: 'Both HSRP and GLBP',
        },
        {
          type: 'fill',
          question: 'The open-standard FHRP equivalent to HSRP is _____ (Virtual Router Redundancy Protocol).',
          answer: 'VRRP',
        },
        {
          type: 'tf',
          question: 'GLBP allows multiple routers to actively forward traffic simultaneously for the same virtual IP.',
          answer: true,
          explanation: 'Gateway Load Balancing Protocol (GLBP) is unique among FHRPs — it provides both redundancy and load balancing by having multiple routers actively forward traffic using the same virtual IP but different virtual MAC addresses.',
        },
        {
          type: 'mcq',
          question: 'What is the key advantage of GLBP over HSRP?',
          choices: [
            'GLBP is an open standard',
            'GLBP allows load balancing across multiple active routers',
            'GLBP uses a lower administrative distance',
            'GLBP converges faster than HSRP',
          ],
          answer: 'GLBP allows load balancing across multiple active routers',
        },
      ],
    },
    {
      id: 'l2',
      title: 'HSRP Configuration',
      icon: '⚙️',
      questions: [
        {
          type: 'teach',
          title: 'Configuring HSRP',
          body: 'Configure HSRP on an interface with "standby [group] ip [virtual-ip]". Set priority with "standby [group] priority [0-255]" — higher wins active role (default 100). Enable preemption with "standby [group] preempt" so the higher-priority router reclaims active status after recovering from a failure. Without preempt, the current active router keeps its role even after a higher-priority router returns.',
        },
        {
          type: 'mcq',
          question: 'Which command sets HSRP group 1 virtual IP to 192.168.1.254?',
          choices: [
            'standby 1 virtual-ip 192.168.1.254',
            'standby 1 ip 192.168.1.254',
            'hsrp group 1 192.168.1.254',
            'ip standby 1 192.168.1.254',
          ],
          answer: 'standby 1 ip 192.168.1.254',
        },
        {
          type: 'mcq',
          question: 'Which HSRP router wins the active role?',
          choices: [
            'The router with the lowest priority',
            'The router with the highest priority',
            'The router with the highest IP address',
            'The router that boots first, regardless of priority',
          ],
          answer: 'The router with the highest priority',
        },
        {
          type: 'tf',
          question: 'Without "standby preempt", a recovered higher-priority router will immediately reclaim the active role.',
          answer: false,
          explanation: 'Without preempt, the current active router keeps its role indefinitely — even if a higher-priority router recovers. "standby preempt" must be configured on the higher-priority router for it to reclaim active status.',
        },
        {
          type: 'mcq',
          question: 'What is the default HSRP priority?',
          choices: ['0', '50', '100', '255'],
          answer: '100',
        },
        {
          type: 'fill',
          question: 'The command to enable HSRP preemption on group 1 is "standby 1 _____".',
          answer: 'preempt',
        },
        {
          type: 'mcq',
          question: 'HSRP v2 supports which additional feature compared to HSRP v1?',
          choices: [
            'IPv6 virtual addresses and group numbers 0–4095',
            'Load balancing across active routers',
            'Open-standard interoperability',
            'Faster hello timers',
          ],
          answer: 'IPv6 virtual addresses and group numbers 0–4095',
        },
        {
          type: 'tf',
          question: 'HSRP uses a virtual MAC address that changes whenever the active router changes.',
          answer: false,
          explanation: 'The HSRP virtual MAC address is tied to the group, not the active router. It remains the same (e.g. 0000.0c07.acXX for HSRPv1) regardless of which physical router is currently active — this prevents ARP cache disruption during failover.',
        },
        {
          type: 'mcq',
          question: 'Which command shows the current HSRP state (Active/Standby) and virtual IP?',
          choices: ['show standby', 'show hsrp', 'show ip standby', 'show fhrp'],
          answer: 'show standby',
        },
      ],
    },
    {
      id: 'l3',
      title: 'HSRP States & Timers',
      icon: '⏱️',
      questions: [
        {
          type: 'teach',
          title: 'HSRP State Machine',
          body: 'HSRP routers cycle through states: Initial → Learn → Listen → Speak → Standby → Active. The active router forwards traffic for the virtual IP and sends Hello messages every 3 seconds by default. If the standby router does not hear from the active router within the hold time (10 seconds by default), it takes over. Tune these with "standby [group] timers [hello] [hold]".',
        },
        {
          type: 'mcq',
          question: 'What is the default HSRP Hello interval?',
          choices: ['1 second', '3 seconds', '5 seconds', '10 seconds'],
          answer: '3 seconds',
        },
        {
          type: 'mcq',
          question: 'What is the default HSRP hold time before a standby router takes over?',
          choices: ['3 seconds', '5 seconds', '10 seconds', '30 seconds'],
          answer: '10 seconds',
        },
        {
          type: 'tf',
          question: 'A router in HSRP "Standby" state is actively forwarding user traffic.',
          answer: false,
          explanation: 'Only the router in the "Active" state forwards traffic for the virtual IP. The "Standby" router monitors the active router and is ready to take over, but does not forward user traffic.',
        },
        {
          type: 'mcq',
          question: 'Which HSRP state does a router enter when it is ready to take over from the active router?',
          choices: ['Listen', 'Speak', 'Standby', 'Active'],
          answer: 'Standby',
        },
        {
          type: 'fill',
          question: 'HSRP Hello packets are sent to multicast address 224.0.0._____ (HSRPv1).',
          answer: '2',
        },
        {
          type: 'mcq',
          question: 'Which command sets the HSRP hello timer to 1 second and hold time to 3 seconds for group 1?',
          choices: [
            'standby 1 timers 1 3',
            'standby 1 hello 1 hold 3',
            'hsrp timers group1 1 3',
            'standby 1 interval 1 timeout 3',
          ],
          answer: 'standby 1 timers 1 3',
        },
        {
          type: 'tf',
          question: 'Multiple HSRP groups can be configured on the same interface for load balancing.',
          answer: true,
          explanation: 'By configuring multiple HSRP groups on an interface and making Router A active for group 1 and Router B active for group 2, you can load balance traffic across both routers by pointing different hosts to different virtual IPs.',
        },
        {
          type: 'mcq',
          question: 'What happens when an HSRP active router fails?',
          choices: [
            'All hosts lose connectivity until manually reconfigured',
            'The standby router transitions to active after the hold time expires',
            'A new election immediately begins among all routers',
            'The router with the highest IP becomes active',
          ],
          answer: 'The standby router transitions to active after the hold time expires',
        },
      ],
    },
    {
      id: 'l4',
      title: 'HSRP Tracking & Verification',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Object Tracking with HSRP',
          body: 'HSRP can track an upstream interface or IP SLA — if the tracked object goes down, the router decrements its HSRP priority by a configured amount, allowing a better-connected router to become active. Configure with "standby [group] track [object-number] decrement [value]". Without tracking, a router could remain HSRP active even after its uplink to the internet fails.',
        },
        {
          type: 'mcq',
          question: 'Why would you configure HSRP interface tracking?',
          choices: [
            'To speed up HSRP hello timers',
            'To allow a router to decrement its priority if an upstream link fails',
            'To prevent preemption',
            'To synchronise HSRP and OSPF priorities',
          ],
          answer: 'To allow a router to decrement its priority if an upstream link fails',
        },
        {
          type: 'mcq',
          question: 'Which command shows the current HSRP active/standby state and virtual MAC address?',
          choices: ['show standby brief', 'show hsrp detail', 'show ip hsrp', 'show fhrp groups'],
          answer: 'show standby brief',
        },
        {
          type: 'tf',
          question: 'Without HSRP tracking, a router can remain active even if its WAN uplink has failed.',
          answer: true,
          explanation: 'HSRP only monitors router-to-router Hello messages. Without tracking, the active router keeps its role even if its connection to the internet or upstream network has gone down — hosts would then be sending traffic to a router that cannot forward it further.',
        },
        {
          type: 'mcq',
          question: 'HSRP tracking decrements the priority by a configured value when a tracked object fails. What is the default decrement?',
          choices: ['5', '10', '20', '50'],
          answer: '10',
        },
        {
          type: 'fill',
          question: 'The HSRP virtual MAC address format for HSRPv1 group 1 is 0000.0c07.ac_____ (in hex).',
          answer: '01',
        },
        {
          type: 'mcq',
          question: 'You want Router A (priority 110) to always be the HSRP active router after recovering from a failure. What must be configured?',
          choices: [
            'standby preempt on Router A',
            'standby priority 255 on Router A',
            'standby preempt on Router B',
            'no standby priority on Router B',
          ],
          answer: 'standby preempt on Router A',
        },
        {
          type: 'tf',
          question: 'VRRP uses the same virtual MAC address format as HSRP.',
          answer: false,
          explanation: 'VRRP uses a different virtual MAC format: 0000.5e00.01XX where XX is the group number. HSRP uses 0000.0c07.acXX (v1) or 0000.0c9f.fXXX (v2). They are distinct protocols with different MAC schemes.',
        },
        {
          type: 'mcq',
          question: 'Which verification command shows HSRP group state, priority, virtual IP, and active/standby router in a concise table?',
          choices: ['show standby brief', 'show standby', 'show ip standby', 'show hsrp summary'],
          answer: 'show standby brief',
        },
      ],
    },
  ],
};
