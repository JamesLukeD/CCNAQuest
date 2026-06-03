import type { Section } from '../../../lib/types';

export const SECTION_ETHERCHANNEL: Section = {
  id: 'etherchannel',
  title: 'EtherChannel',
  icon: '⛓️',
  unlockAfter: 'stp',
  lessons: [
    {
      id: 'l1',
      title: 'EtherChannel Concepts',
      icon: '⛓️',
      questions: [
        {
          type: 'teach',
          title: 'What Is EtherChannel?',
          body: 'EtherChannel bundles multiple physical links between two switches into a single logical link. STP sees the bundle as one interface, preventing any links from being blocked. Traffic is load-balanced across all member links using a hashing algorithm (source/destination MAC, IP, or port). If one physical link fails, traffic continues on the remaining links with no STP reconvergence.',
        },
        {
          type: 'mcq',
          question: 'What is the main advantage of EtherChannel over individual redundant links?',
          choices: [
            'STP blocks all links except one for safety',
            'All links are active and traffic is load-balanced — STP does not block any',
            'EtherChannel uses a different STP instance per link',
            'EtherChannel eliminates the need for trunking',
          ],
          answer: 'All links are active and traffic is load-balanced — STP does not block any',
        },
        {
          type: 'tf',
          question: 'STP treats an EtherChannel bundle as multiple individual links.',
          answer: false,
          explanation: 'STP sees the entire EtherChannel bundle as a single logical link. This is why EtherChannel is so powerful — it provides redundancy and bandwidth aggregation without STP blocking any of the member links.',
        },
        {
          type: 'mcq',
          question: 'How many physical links can be bundled in a single EtherChannel on Cisco switches?',
          choices: ['2', 'Up to 8', 'Up to 16', 'Unlimited'],
          answer: 'Up to 8',
        },
        {
          type: 'mcq',
          question: 'Which load-balancing method is commonly used by EtherChannel to distribute traffic?',
          choices: [
            'Round-robin per packet',
            'Hash of source/destination MAC or IP addresses',
            'Random port selection',
            'Lowest-utilisation port',
          ],
          answer: 'Hash of source/destination MAC or IP addresses',
        },
        {
          type: 'fill',
          question: 'EtherChannel is also known as a port _____ or link aggregation group (LAG).',
          answer: 'channel',
        },
        {
          type: 'tf',
          question: 'If one link in an EtherChannel fails, STP must reconverge before traffic can use the remaining links.',
          answer: false,
          explanation: 'One of the key benefits of EtherChannel is that link failures within the bundle are handled transparently without STP reconvergence. Traffic is redistributed across the remaining active member links immediately.',
        },
        {
          type: 'mcq',
          question: 'What is the IEEE open-standard protocol for link aggregation (equivalent to EtherChannel)?',
          choices: ['PAgP', 'LACP', 'RSTP', 'VTP'],
          answer: 'LACP',
        },
      ],
    },
    {
      id: 'l2',
      title: 'PAgP and LACP',
      icon: '🤝',
      questions: [
        {
          type: 'teach',
          title: 'Negotiation Protocols',
          body: 'EtherChannel can be formed dynamically using PAgP (Port Aggregation Protocol — Cisco-proprietary) or LACP (Link Aggregation Control Protocol — IEEE 802.3ad open standard). Both have active and passive modes: PAgP uses Desirable (active) and Auto (passive); LACP uses Active and Passive. Two passive/auto sides will never form a channel. Static EtherChannel (On mode) forces bundling with no negotiation.',
        },
        {
          type: 'mcq',
          question: 'Which EtherChannel protocol is Cisco-proprietary?',
          choices: ['LACP', 'PAgP', '802.3ad', 'LLDP'],
          answer: 'PAgP',
        },
        {
          type: 'mcq',
          question: 'Which IEEE standard defines LACP?',
          choices: ['802.1Q', '802.1D', '802.3ad', '802.1W'],
          answer: '802.3ad',
        },
        {
          type: 'tf',
          question: 'Two switches both configured with PAgP "auto" mode will successfully form an EtherChannel.',
          answer: false,
          explanation: 'PAgP Auto is passive — it waits for the other side to initiate. If both sides are Auto, neither side initiates and the channel never forms. At least one side must be "desirable" (active).',
        },
        {
          type: 'mcq',
          question: 'Which PAgP mode actively initiates EtherChannel negotiation?',
          choices: ['Auto', 'Passive', 'Desirable', 'On'],
          answer: 'Desirable',
        },
        {
          type: 'mcq',
          question: 'Which LACP mode actively initiates EtherChannel negotiation?',
          choices: ['Auto', 'Passive', 'Desirable', 'Active'],
          answer: 'Active',
        },
        {
          type: 'fill',
          question: 'Configuring EtherChannel with "channel-group [n] mode on" forces bundling with _____ negotiation protocol.',
          answer: 'no',
        },
        {
          type: 'tf',
          question: 'LACP Passive mode will form a channel if the other side is LACP Active.',
          answer: true,
          explanation: 'LACP Passive waits for the other side to initiate. If one side is Active (initiates) and the other is Passive (responds), the channel will form successfully.',
        },
        {
          type: 'mcq',
          question: 'What happens if one side of an EtherChannel is configured "On" and the other uses LACP Active?',
          choices: [
            'The channel forms using LACP',
            'The channel forms using static mode',
            'The channel fails to form — On mode does not negotiate',
            'PAgP takes over as a fallback',
          ],
          answer: 'The channel fails to form — On mode does not negotiate',
        },
      ],
    },
    {
      id: 'l3',
      title: 'EtherChannel Configuration',
      icon: '🔧',
      questions: [
        {
          type: 'teach',
          title: 'Configuring EtherChannel',
          body: 'Configure each member interface identically (speed, duplex, VLAN, trunk settings) then assign them to a channel group with "channel-group [n] mode [mode]". The logical Port-Channel interface is automatically created. Configure VLAN/trunk settings on the Port-Channel interface itself — not on individual member ports. Use "interface port-channel [n]" to configure the logical interface.',
        },
        {
          type: 'mcq',
          question: 'Which command adds interface Gi0/1 to EtherChannel group 1 using LACP active mode?',
          choices: [
            'etherchannel group 1 lacp active',
            'channel-group 1 mode active',
            'lacp channel-group 1',
            'port-channel 1 active',
          ],
          answer: 'channel-group 1 mode active',
        },
        {
          type: 'tf',
          question: 'Trunk and VLAN settings should be configured on individual EtherChannel member ports, not the Port-Channel interface.',
          answer: false,
          explanation: 'Always configure VLAN, trunking, and other Layer 2/3 settings on the Port-Channel (logical) interface. Settings on individual member ports are overridden by the Port-Channel configuration.',
        },
        {
          type: 'mcq',
          question: 'What must be consistent across all member interfaces for EtherChannel to form?',
          choices: [
            'Speed, duplex, VLAN membership, and trunk settings',
            'IP address and OSPF cost',
            'STP priority and BPDU Guard setting',
            'VTP mode and domain name',
          ],
          answer: 'Speed, duplex, VLAN membership, and trunk settings',
        },
        {
          type: 'fill',
          question: 'The logical EtherChannel interface is named "interface port-channel _____" where the number matches the channel-group.',
          answer: '[n]',
        },
        {
          type: 'mcq',
          question: 'Which command configures LACP passive mode on a member interface for channel group 2?',
          choices: [
            'channel-group 2 mode passive',
            'channel-group 2 mode auto',
            'lacp group 2 passive',
            'port-channel 2 passive',
          ],
          answer: 'channel-group 2 mode passive',
        },
        {
          type: 'tf',
          question: 'An EtherChannel member port with a different speed than other members will still join the channel.',
          answer: false,
          explanation: 'All EtherChannel member interfaces must have the same speed and duplex settings. A port with a mismatched configuration will be suspended and will not join the bundle.',
        },
        {
          type: 'mcq',
          question: 'Which command configures the Port-Channel 1 interface as a trunk?',
          choices: [
            'On each member: switchport mode trunk',
            'On interface port-channel 1: switchport mode trunk',
            'On the physical interface: etherchannel trunk',
            'trunk port-channel 1',
          ],
          answer: 'On interface port-channel 1: switchport mode trunk',
        },
      ],
    },
    {
      id: 'l4',
      title: 'EtherChannel Verification',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Verifying and Troubleshooting EtherChannel',
          body: 'Use "show etherchannel summary" for a quick overview of all channel groups, member ports, and protocol (PAgP/LACP/Static). Flags indicate status: P = bundled in port-channel, D = down, I = individual (not bundled, often a mismatch). Use "show etherchannel [n] detail" for detailed negotiation info. "show interfaces port-channel [n]" shows the logical interface statistics.',
        },
        {
          type: 'mcq',
          question: 'Which command gives a one-line summary of all EtherChannel groups and their member port states?',
          choices: [
            'show interfaces port-channel',
            'show etherchannel summary',
            'show lacp neighbor',
            'show port-channel brief',
          ],
          answer: 'show etherchannel summary',
        },
        {
          type: 'mcq',
          question: 'In "show etherchannel summary", a member port with flag "I" (Individual) indicates what?',
          choices: [
            'The port is actively forwarding in the bundle',
            'The port is not bundled, usually due to a configuration mismatch',
            'The port is in standby mode',
            'The port is using independent LACP negotiation',
          ],
          answer: 'The port is not bundled, usually due to a configuration mismatch',
        },
        {
          type: 'tf',
          question: 'STP sees each physical member of an EtherChannel as a separate link.',
          answer: false,
          explanation: 'STP sees the entire EtherChannel as a single logical link (the Port-Channel interface). This is fundamental to how EtherChannel avoids STP blocking redundant paths.',
        },
        {
          type: 'mcq',
          question: 'EtherChannel member ports show as "I" (individual) instead of "P" (port-channel). What is the most likely cause?',
          choices: [
            'LACP timers are mismatched',
            'Speed, duplex, or VLAN settings differ between member ports',
            'STP is blocking one of the links',
            'The Port-Channel interface is shut down',
          ],
          answer: 'Speed, duplex, or VLAN settings differ between member ports',
        },
        {
          type: 'fill',
          question: 'The command to view LACP neighbour information for EtherChannel group 1 is "show lacp _____".',
          answer: 'neighbor',
        },
        {
          type: 'tf',
          question: 'The EtherChannel load-balancing method can be changed with the "port-channel load-balance" global command.',
          answer: true,
          explanation: 'Cisco IOS allows you to change the hashing algorithm used for EtherChannel load balancing with "port-channel load-balance [method]". Options include src-mac, dst-mac, src-dst-mac, src-ip, dst-ip, src-dst-ip.',
        },
        {
          type: 'mcq',
          question: 'Which command shows the current EtherChannel load-balancing method configured on the switch?',
          choices: [
            'show etherchannel load-balance',
            'show port-channel load-balance',
            'show etherchannel summary',
            'show interfaces port-channel detail',
          ],
          answer: 'show etherchannel load-balance',
        },
        {
          type: 'mcq',
          question: 'An EtherChannel is formed between two switches. Switch A uses LACP Active and Switch B uses LACP Passive. Does the channel form?',
          choices: [
            'No — both must be Active',
            'No — both must be Passive',
            'Yes — Active + Passive is a valid combination',
            'Only if PAgP is also enabled as fallback',
          ],
          answer: 'Yes — Active + Passive is a valid combination',
        },
      ],
    },
  ],
};
