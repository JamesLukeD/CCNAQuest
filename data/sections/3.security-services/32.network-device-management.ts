import type { Section } from '../../../lib/types';

export const SECTION_NETWORK_DEVICE_MANAGEMENT: Section = {
  id: 'network-device-management',
  title: 'Network Device Management',
  icon: '🗄️',
  unlockAfter: 'cisco-device-security',
  lessons: [
    {
      id: 'l1',
      title: 'SNMP',
      icon: '📊',
      questions: [
        {
          type: 'teach',
          title: 'Simple Network Management Protocol',
          body: 'SNMP monitors and manages network devices using a manager/agent model. The NMS (Network Management Station) polls agents on devices using UDP port 161 (GET/SET requests). Agents send unsolicited Trap messages to the NMS on UDP port 162. SNMPv2c uses community strings (plain text — insecure). SNMPv3 adds authentication (MD5/SHA) and encryption (AES/DES) — always prefer v3 in production.',
        },
        {
          type: 'mcq',
          question: 'Which SNMP version supports both authentication and encryption?',
          choices: ['SNMPv1', 'SNMPv2c', 'SNMPv3', 'SNMPv2'],
          answer: 'SNMPv3',
        },
        {
          type: 'mcq',
          question: 'Which UDP port does an SNMP agent listen on for manager requests?',
          choices: ['162', '161', '514', '123'],
          answer: '161',
        },
        {
          type: 'tf',
          question: 'SNMP Trap messages are sent from the agent to the NMS without being polled.',
          answer: true,
          explanation: 'Traps are unsolicited notifications sent by an agent to the NMS when a significant event occurs (interface down, CPU threshold exceeded). The NMS does not need to poll — the trap is push-based.',
        },
        {
          type: 'mcq',
          question: 'What is the security weakness of SNMPv2c?',
          choices: [
            'It does not support GET requests',
            'Community strings are sent in plain text',
            'It only supports UDP, not TCP',
            'It cannot send Trap messages',
          ],
          answer: 'Community strings are sent in plain text',
        },
        {
          type: 'fill',
          question: 'SNMP Trap messages are sent to the NMS on UDP port _____.',
          answer: '162',
        },
        {
          type: 'mcq',
          question: 'Which SNMPv3 security level provides both authentication and encryption?',
          choices: ['noAuthNoPriv', 'authNoPriv', 'authPriv', 'privAuth'],
          answer: 'authPriv',
        },
        {
          type: 'tf',
          question: 'The SNMP read-only community string "public" is a security best practice.',
          answer: false,
          explanation: '"public" is the well-known default SNMP community string. Using it exposes device information to anyone who can reach the device on UDP 161. Always change community strings to complex, unique values or use SNMPv3.',
        },
        {
          type: 'mcq',
          question: 'Which command configures a Cisco router to send SNMP traps to NMS at 10.0.0.100 using community "CORP"?',
          choices: [
            'snmp-server trap 10.0.0.100 CORP',
            'snmp-server host 10.0.0.100 CORP',
            'snmp-server community CORP trap 10.0.0.100',
            'snmp trap 10.0.0.100 community CORP',
          ],
          answer: 'snmp-server host 10.0.0.100 CORP',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Syslog and NetFlow',
      icon: '📝',
      questions: [
        {
          type: 'teach',
          title: 'Syslog Severity Levels',
          body: 'Syslog sends device log messages to a central syslog server over UDP port 514. Severity levels 0–7: 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Informational, 7=Debug. Lower number = higher severity. "logging trap [level]" sets the minimum severity level forwarded to the syslog server. NetFlow collects IP traffic statistics (source/dest IP, port, protocol, byte count) for traffic analysis.',
        },
        {
          type: 'mcq',
          question: 'Which syslog severity level is most critical?',
          choices: ['7 — Debug', '0 — Emergency', '3 — Error', '5 — Notice'],
          answer: '0 — Emergency',
        },
        {
          type: 'mcq',
          question: 'Which UDP port does syslog use by default?',
          choices: ['161', '162', '514', '123'],
          answer: '514',
        },
        {
          type: 'tf',
          question: '"logging trap warnings" sends syslog messages at severity levels 0 through 4 to the syslog server.',
          answer: true,
          explanation: 'Syslog "trap" sets the minimum level. "Warnings" = level 4, so messages at levels 0 (Emergency) through 4 (Warning) are forwarded. More verbose levels (5=Notice, 6=Info, 7=Debug) are NOT sent.',
        },
        {
          type: 'mcq',
          question: 'What does NetFlow primarily collect?',
          choices: [
            'Syslog messages from all devices',
            'IP traffic flow statistics (src/dst IP, port, protocol, bytes)',
            'SNMP counters from interfaces',
            'BGP routing table updates',
          ],
          answer: 'IP traffic flow statistics (src/dst IP, port, protocol, bytes)',
        },
        {
          type: 'fill',
          question: 'The syslog severity level for routine informational messages is level _____.',
          answer: '6',
        },
        {
          type: 'tf',
          question: 'NetFlow can be used to detect anomalous traffic patterns that may indicate a security breach.',
          answer: true,
          explanation: 'NetFlow data reveals traffic patterns — unusual volumes of traffic from a single source, unexpected protocols, or traffic to unknown external IPs can indicate DDoS attacks, data exfiltration, or malware communication.',
        },
        {
          type: 'mcq',
          question: 'Which command sends syslog messages to a server at 10.0.0.200?',
          choices: [
            'logging server 10.0.0.200',
            'logging 10.0.0.200',
            'syslog 10.0.0.200',
            'logging host 10.0.0.200',
          ],
          answer: 'logging 10.0.0.200',
        },
      ],
    },
    {
      id: 'l3',
      title: 'SPAN and Config Backup',
      icon: '📸',
      questions: [
        {
          type: 'teach',
          title: 'SPAN and Configuration Management',
          body: 'SPAN (Switched Port Analyser) copies traffic from source ports/VLANs to a destination port connected to a packet analyser (e.g. Wireshark). RSPAN extends this across switches using a dedicated VLAN. Back up device configurations with "copy running-config tftp" or "copy running-config ftp". Restore with "copy tftp running-config". Store backups offsite and verify them regularly.',
        },
        {
          type: 'mcq',
          question: 'What is the primary purpose of SPAN on a switch?',
          choices: [
            'To block suspicious traffic',
            'To mirror traffic from ports/VLANs to a monitoring port',
            'To enable port security',
            'To aggregate switch uplinks',
          ],
          answer: 'To mirror traffic from ports/VLANs to a monitoring port',
        },
        {
          type: 'mcq',
          question: 'Which command backs up the running configuration to a TFTP server at 10.0.0.100?',
          choices: [
            'backup running-config tftp 10.0.0.100',
            'copy running-config tftp',
            'save running-config 10.0.0.100',
            'write tftp 10.0.0.100',
          ],
          answer: 'copy running-config tftp',
        },
        {
          type: 'tf',
          question: 'RSPAN allows traffic mirroring to a destination port on a different switch.',
          answer: true,
          explanation: 'Remote SPAN (RSPAN) uses a dedicated VLAN to carry mirrored traffic across the network fabric to a destination port on a remote switch, where a packet analyser is connected.',
        },
        {
          type: 'mcq',
          question: 'Which command saves the running configuration to NVRAM on a Cisco device?',
          choices: [
            'save configuration',
            'write memory',
            'copy running-config startup-config',
            'Both B and C',
          ],
          answer: 'Both B and C',
        },
        {
          type: 'fill',
          question: 'The switch feature that copies traffic from monitored ports to an analyser is called _____ (Switched Port Analyser).',
          answer: 'SPAN',
        },
        {
          type: 'tf',
          question: 'SPAN affects the forwarding performance of monitored ports because it introduces additional processing overhead.',
          answer: false,
          explanation: 'SPAN is hardware-based on modern Cisco switches and does not degrade the forwarding performance of monitored ports. The original frames are forwarded normally; copies are sent to the destination port independently.',
        },
        {
          type: 'mcq',
          question: 'Which command restores a configuration from a TFTP server into the running config?',
          choices: [
            'copy tftp running-config',
            'restore tftp running-config',
            'load tftp running-config',
            'import tftp running-config',
          ],
          answer: 'copy tftp running-config',
        },
      ],
    },
    {
      id: 'l4',
      title: 'IOS Upgrade and Boot Process',
      icon: '🔄',
      questions: [
        {
          type: 'teach',
          title: 'Upgrading IOS and Managing Flash',
          body: 'IOS images are stored in flash memory. View flash contents with "show flash". Copy a new IOS image from TFTP with "copy tftp flash". Set the boot image with "boot system flash:[filename]". Verify the image hash (MD5) after transfer to ensure integrity. The Cisco IOS boot sequence: POST → Bootstrap (in ROM) → locate and load IOS → load startup-config from NVRAM.',
        },
        {
          type: 'mcq',
          question: 'Where is the Cisco IOS image stored on a router?',
          choices: ['NVRAM', 'RAM', 'Flash memory', 'ROM'],
          answer: 'Flash memory',
        },
        {
          type: 'mcq',
          question: 'Which command shows the files stored in flash memory?',
          choices: ['show flash', 'dir flash:', 'Both A and B', 'show version'],
          answer: 'Both A and B',
        },
        {
          type: 'tf',
          question: 'The startup-config is stored in NVRAM and loaded into RAM as the running-config during boot.',
          answer: true,
          explanation: 'During boot, the router copies the startup-config from NVRAM into RAM where it becomes the running-config. Changes made to the running-config are lost on reload unless saved with "copy running-config startup-config".',
        },
        {
          type: 'mcq',
          question: 'Which command copies a new IOS image from a TFTP server to flash?',
          choices: ['copy tftp flash', 'install tftp ios', 'upgrade ios tftp', 'copy tftp running'],
          answer: 'copy tftp flash',
        },
        {
          type: 'fill',
          question: 'The startup configuration is stored in _____ memory and persists across reboots.',
          answer: 'NVRAM',
        },
        {
          type: 'mcq',
          question: 'In which memory type does the running configuration reside?',
          choices: ['Flash', 'NVRAM', 'ROM', 'RAM'],
          answer: 'RAM',
        },
        {
          type: 'tf',
          question: 'The "show version" command displays the IOS version, uptime, and the location of the boot image.',
          answer: true,
          explanation: '"show version" shows IOS version, system uptime, hardware, memory, and the System image file path (e.g. flash:c2900-universalk9-mz.SPA.156-3.M10.bin), making it a key command for OS and hardware inventory.',
        },
        {
          type: 'mcq',
          question: 'Which Cisco command verifies the MD5 hash of a flash image to confirm integrity?',
          choices: [
            'verify flash:[filename]',
            'verify /md5 flash:[filename]',
            'md5 flash:[filename]',
            'check integrity flash:[filename]',
          ],
          answer: 'verify /md5 flash:[filename]',
        },
      ],
    },
  ],
};
