import type { Section } from '../../../lib/types';

export const SECTION_VLANS: Section = {
  id: 'vlans',
  title: 'VLANs – Virtual Local Area Networks',
  icon: '🏘️',
  unlockAfter: 'ospf',
  lessons: [
    {
      id: 'l1',
      title: 'VLAN Fundamentals',
      icon: '🏘️',
      questions: [
        {
          type: 'teach',
          title: 'What Is a VLAN?',
          body: 'A VLAN (Virtual LAN) logically segments a physical switch into multiple separate broadcast domains without requiring separate hardware. Devices in different VLANs cannot communicate at Layer 2 — they need a Layer 3 device (router or Layer 3 switch) to route between them. VLANs are identified by a 12-bit VLAN ID ranging from 1 to 4094; VLAN 1 is the default VLAN and exists on all ports by default.',
        },
        {
          type: 'teach',
          title: 'Benefits of VLANs',
          body: 'VLANs provide security by isolating sensitive traffic (e.g. management, voice, guest), reduce broadcast domain size to improve performance, and allow logical grouping of users regardless of physical location. For example, all Finance desktops across multiple floors can be in VLAN 10, and all VoIP phones in VLAN 20 — both sharing the same physical switches.',
        },
        {
          type: 'mcq',
          question: 'What is the valid VLAN ID range on a Cisco switch?',
          choices: ['0 to 4095', '1 to 4094', '1 to 1024', '2 to 4096'],
          answer: '1 to 4094',
        },
        {
          type: 'mcq',
          question: 'What is the default VLAN on all Cisco switch ports?',
          choices: ['VLAN 0', 'VLAN 1', 'VLAN 10', 'VLAN 1002'],
          answer: 'VLAN 1',
        },
        {
          type: 'tf',
          question: 'Devices in different VLANs can communicate at Layer 2 without any routing.',
          answer: false,
          explanation: 'VLANs create separate Layer 2 broadcast domains. Traffic between VLANs must be routed by a Layer 3 device — either an external router (router-on-a-stick) or a Layer 3 switch with SVIs.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is a key benefit of using VLANs?',
          choices: [
            'Increases the number of collision domains',
            'Reduces broadcast domain size and improves security',
            'Eliminates the need for a default gateway',
            'Allows Layer 2 forwarding between all switches',
          ],
          answer: 'Reduces broadcast domain size and improves security',
        },
        {
          type: 'tf',
          question: 'VLAN 1 is the default VLAN and cannot be deleted on Cisco switches.',
          answer: true,
          explanation: 'VLAN 1 is the factory default VLAN and is permanent on Cisco switches — it cannot be deleted. All ports belong to VLAN 1 until explicitly reassigned. Best practice is to move management and user traffic off VLAN 1.',
        },
        {
          type: 'fill',
          question: 'A VLAN is identified by a ___-bit VLAN ID, allowing values from 1 to 4094.',
          answer: '12',
        },
        {
          type: 'mcq',
          question: 'Hosts in VLAN 10 and VLAN 20 on the same switch want to communicate. What is required?',
          choices: [
            'A trunk link between the VLANs',
            'A Layer 3 device to route between the VLANs',
            'STP must be disabled on both VLANs',
            'Both VLANs must have the same subnet',
          ],
          answer: 'A Layer 3 device to route between the VLANs',
        },
        {
          type: 'mcq',
          question: 'VLANs 1002–1005 on Cisco switches are reserved for which legacy technologies?',
          choices: [
            'Management and voice VLANs',
            'FDDI and Token Ring',
            'Spanning Tree Protocol',
            'VTP server synchronisation',
          ],
          answer: 'FDDI and Token Ring',
        },
      ],
    },
    {
      id: 'l2',
      title: 'VLAN Configuration',
      icon: '🔧',
      questions: [
        {
          type: 'teach',
          title: 'Creating VLANs and Assigning Access Ports',
          body: 'Create a VLAN in global config with "vlan [id]" then optionally name it with "name [name]". To assign a switch port to a VLAN, enter the interface, set it as an access port with "switchport mode access", then assign it with "switchport access vlan [id]". An access port carries traffic for exactly one VLAN and does not tag frames — the connected device has no awareness of VLANs.',
        },
        {
          type: 'teach',
          title: 'Verifying VLAN Configuration',
          body: 'Use "show vlan brief" to see all VLANs and which ports are assigned to each. Use "show interfaces [int] switchport" to confirm an individual port\'s mode (access or trunk) and its assigned VLAN. If a port is in the wrong VLAN or still in VLAN 1 by mistake, these commands will catch it quickly.',
        },
        {
          type: 'mcq',
          question: 'Which command creates VLAN 10 on a Cisco switch?',
          choices: ['vlan create 10', 'vlan 10', 'interface vlan 10', 'switchport vlan 10'],
          answer: 'vlan 10',
        },
        {
          type: 'mcq',
          question: 'Which command assigns an access port to VLAN 20?',
          choices: [
            'switchport vlan 20',
            'switchport access vlan 20',
            'vlan 20 access',
            'interface vlan 20',
          ],
          answer: 'switchport access vlan 20',
        },
        {
          type: 'tf',
          question: 'An access port tags outgoing frames with a VLAN ID before forwarding them.',
          answer: false,
          explanation: 'Access ports do NOT add VLAN tags. They strip any incoming tags and forward untagged frames — the end device has no knowledge of VLANs. It is trunk ports that tag frames with 802.1Q headers.',
        },
        {
          type: 'mcq',
          question: 'Which command confirms which VLAN a switch port is assigned to?',
          choices: [
            'show vlan brief',
            'show interfaces switchport',
            'show running-config',
            'All of the above',
          ],
          answer: 'All of the above',
        },
        {
          type: 'mcq',
          question: 'Before assigning a port to VLAN 30, what mode must it be set to?',
          choices: ['Trunk mode', 'Access mode', 'Dynamic desirable', 'Routed mode'],
          answer: 'Access mode',
        },
        {
          type: 'fill',
          question: 'The command to name VLAN 10 as "Engineering" (entered after "vlan 10") is "name _____".',
          answer: 'Engineering',
        },
        {
          type: 'tf',
          question: 'A VLAN must exist in the VLAN database before a port can be assigned to it.',
          answer: false,
          explanation: 'On most Cisco IOS switches, assigning a port to a non-existent VLAN with "switchport access vlan [id]" will automatically create that VLAN in the VLAN database. However, best practice is to create and name the VLAN first.',
        },
        {
          type: 'mcq',
          question: 'How many VLANs can an access port carry?',
          choices: ['1', '2', '4094', 'Unlimited'],
          answer: '1',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Trunk Links',
      icon: '🔗',
      questions: [
        {
          type: 'teach',
          title: '802.1Q Trunking',
          body: 'A trunk link carries traffic for multiple VLANs between switches (or between a switch and a router). IEEE 802.1Q is the trunking standard — it inserts a 4-byte tag into the Ethernet frame header containing the 12-bit VLAN ID. The native VLAN is the one VLAN whose traffic crosses the trunk untagged; by default this is VLAN 1 on Cisco switches. Configure a trunk with "switchport mode trunk" on the interface.',
        },
        {
          type: 'teach',
          title: 'Controlling VLANs on a Trunk',
          body: 'By default a trunk allows all VLANs (1–4094). Restrict which VLANs are permitted with "switchport trunk allowed vlan [list]". Change the native VLAN with "switchport trunk native vlan [id]" — both ends of the trunk must use the same native VLAN or a native VLAN mismatch warning appears and traffic can be misrouted. Always change the native VLAN away from VLAN 1 for security.',
        },
        {
          type: 'mcq',
          question: 'Which IEEE standard defines VLAN trunking by inserting a 4-byte tag into the Ethernet frame?',
          choices: ['802.1D', '802.1Q', '802.1X', '802.3ad'],
          answer: '802.1Q',
        },
        {
          type: 'mcq',
          question: 'What is the default native VLAN on a Cisco switch trunk?',
          choices: ['VLAN 0', 'VLAN 1', 'VLAN 10', 'VLAN 4094'],
          answer: 'VLAN 1',
        },
        {
          type: 'tf',
          question: 'Traffic on the native VLAN crosses a trunk link with an 802.1Q tag.',
          answer: false,
          explanation: 'The native VLAN is the exception — its traffic crosses the trunk UNTAGGED. All other VLANs are tagged. This is why native VLAN mismatches can cause traffic to be received on the wrong VLAN.',
        },
        {
          type: 'mcq',
          question: 'Which command configures a switch interface as a trunk?',
          choices: [
            'switchport trunk',
            'switchport mode trunk',
            'switchport type trunk',
            'trunk mode on',
          ],
          answer: 'switchport mode trunk',
        },
        {
          type: 'mcq',
          question: 'Which command restricts a trunk to carry only VLANs 10, 20, and 30?',
          choices: [
            'switchport trunk vlan 10,20,30',
            'switchport trunk allowed vlan 10,20,30',
            'vlan allowed trunk 10,20,30',
            'switchport mode trunk vlan 10,20,30',
          ],
          answer: 'switchport trunk allowed vlan 10,20,30',
        },
        {
          type: 'fill',
          question: 'The command to change the native VLAN on a trunk to VLAN 99 is "switchport trunk native vlan _____".',
          answer: '99',
        },
        {
          type: 'tf',
          question: 'A native VLAN mismatch between two trunk ends is a security risk as well as a configuration error.',
          answer: true,
          explanation: 'Native VLAN mismatches cause a VLAN hopping attack vector — an attacker can double-tag frames to have them forwarded onto a different VLAN. Cisco switches will also generate a CDP/STP warning when native VLAN mismatches are detected.',
        },
        {
          type: 'mcq',
          question: 'How many bytes does the 802.1Q VLAN tag add to an Ethernet frame?',
          choices: ['2', '4', '6', '8'],
          answer: '4',
        },
      ],
    },
    {
      id: 'l4',
      title: 'VTP',
      icon: '📋',
      questions: [
        {
          type: 'teach',
          title: 'VTP Modes and How VTP Works',
          body: 'VTP (VLAN Trunking Protocol) is a Cisco-proprietary Layer 2 protocol that propagates VLAN database changes across all switches in the same VTP domain. VTP Server switches create, modify, and delete VLANs and advertise changes to clients. VTP Client switches cannot modify VLANs locally — they receive and apply changes from the server. VTP Transparent switches do not participate in VTP sync but forward VTP advertisements to neighbours.',
        },
        {
          type: 'teach',
          title: 'VTP Risks and Best Practices',
          body: 'VTP is notorious for accidental mass VLAN deletion — if a switch with a higher VTP revision number (e.g. a decommissioned switch) is added to the network, it can overwrite the VLAN database on all VTP clients and wipe all VLANs. Best practice is to use VTP Transparent mode or VTP version 3 (which has a primary server concept to prevent this). Always verify the VTP revision number with "show vtp status" before connecting a new switch.',
        },
        {
          type: 'mcq',
          question: 'Which VTP mode allows a switch to create, modify, and delete VLANs and advertise changes to clients?',
          choices: ['Client', 'Transparent', 'Server', 'Off'],
          answer: 'Server',
        },
        {
          type: 'mcq',
          question: 'Which VTP mode does NOT participate in VTP synchronisation but still forwards VTP advertisements?',
          choices: ['Server', 'Client', 'Transparent', 'Passive'],
          answer: 'Transparent',
        },
        {
          type: 'tf',
          question: 'A VTP Client switch can create VLANs locally without receiving an update from a VTP Server.',
          answer: false,
          explanation: 'VTP Client switches cannot create, modify, or delete VLANs locally. All VLAN changes must originate on a VTP Server and are propagated to clients via VTP advertisements over trunk links.',
        },
        {
          type: 'mcq',
          question: 'What catastrophic event can occur if a switch with a higher VTP revision number is added to a VTP domain?',
          choices: [
            'All trunks are reset to VLAN 1',
            'The VLAN database on all VTP clients is overwritten, potentially wiping all VLANs',
            'STP re-elects the root bridge',
            'All access ports are moved to VLAN 1',
          ],
          answer: 'The VLAN database on all VTP clients is overwritten, potentially wiping all VLANs',
        },
        {
          type: 'mcq',
          question: 'Which command shows the VTP mode, domain, and revision number on a switch?',
          choices: ['show vlan brief', 'show vtp status', 'show vtp counters', 'show vtp domain'],
          answer: 'show vtp status',
        },
        {
          type: 'fill',
          question: 'VTP _____ reduces trunk bandwidth by only advertising VLANs that have active ports on a downstream switch.',
          answer: 'pruning',
        },
        {
          type: 'tf',
          question: 'Switches must be in the same VTP domain to synchronise VLAN databases.',
          answer: true,
          explanation: 'VTP domain name must match exactly (case-sensitive) for VTP advertisements to be accepted. Switches in different VTP domains or with mismatched domain names will not synchronise their VLAN databases.',
        },
        {
          type: 'mcq',
          question: 'What is the safest VTP mode to use when adding a new switch to avoid accidental VLAN database overwrites?',
          choices: ['Server', 'Client', 'Transparent', 'Dynamic'],
          answer: 'Transparent',
        },
        {
          type: 'mcq',
          question: 'Which VTP version introduced the concept of a primary server to prevent accidental VLAN overwrites?',
          choices: ['VTP v1', 'VTP v2', 'VTP v3', 'VTP v4'],
          answer: 'VTP v3',
        },
      ],
    },
  ],
};
