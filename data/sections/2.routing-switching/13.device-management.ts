import type { Section } from '../../../lib/types';

export const SECTION_DEVICE_MANAGEMENT: Section = {
  id: 'device-management',
  title: 'Cisco Device Management',
  icon: '⚙️',
  unlockAfter: 'router-switch-basics',
  lessons: [
    {
      id: 'l1',
      title: 'Hostnames, Banners & Passwords',
      icon: '🔐',
      questions: [
        {
          type: 'teach',
          title: 'Securing the Console and VTY Lines',
          body: 'Every Cisco device should be secured with passwords on the console line (physical access) and VTY lines (remote access via Telnet or SSH). The console is configured under "line console 0" and VTY lines under "line vty 0 4". Use "password [pw]" and "login" to require authentication, or "login local" to use local username/password pairs.',
        },
        {
          type: 'teach',
          title: 'Enable Secret and Password Encryption',
          body: 'The "enable secret [pw]" command sets a hashed (MD5) password to enter Privileged EXEC mode — always prefer this over the older "enable password" which stores in plaintext. Run "service password-encryption" globally to obfuscate all plaintext passwords in the config with a weak type-7 cipher. Banners (MOTD, login) are configured with "banner motd # message #" and are displayed before login.',
        },
        {
          type: 'mcq',
          question: 'Which command sets a hashed password to protect Privileged EXEC mode?',
          choices: [
            'enable password',
            'enable secret',
            'service password-encryption',
            'line vty 0 4 password',
          ],
          answer: 'enable secret',
        },
        {
          type: 'tf',
          question: '"service password-encryption" encrypts passwords with a strong, irreversible hash.',
          answer: false,
          explanation: '"service password-encryption" uses Cisco type-7 encoding, which is a weak reversible cipher — not a strong hash. It discourages casual viewing but is easily decoded. "enable secret" uses MD5 and is far stronger.',
        },
        {
          type: 'mcq',
          question: 'Which IOS mode is used to configure the console port password?',
          choices: [
            'Router(config-if)#',
            'Router(config-line)#',
            'Router(config-router)#',
            'Router#',
          ],
          answer: 'Router(config-line)#',
        },
        {
          type: 'mcq',
          question: 'What is the command to enter the VTY line configuration for lines 0 through 4?',
          choices: [
            'line vty 0 4',
            'interface vty 0 4',
            'line telnet 0 4',
            'access-list vty 0 4',
          ],
          answer: 'line vty 0 4',
        },
        {
          type: 'fill',
          question: 'After setting a password on a line, you must also enter the _____ command to require authentication.',
          answer: 'login',
        },
        {
          type: 'tf',
          question: 'The "enable password" command stores the password as a reversible MD5 hash.',
          answer: false,
          explanation: '"enable password" stores the password in plaintext (or type-7 if service password-encryption is on). It is the older, insecure command. "enable secret" uses MD5 and should always be preferred.',
        },
        {
          type: 'mcq',
          question: 'Which banner type is displayed to users before they log in to a Cisco device?',
          choices: ['Banner MOTD', 'Banner login', 'Banner exec', 'Banner incoming'],
          answer: 'Banner login',
        },
        {
          type: 'wordbank',
          question: 'Order these password security methods from weakest to strongest:',
          bank: ['enable secret', 'enable password', 'service password-encryption'],
          answer: ['enable password', 'service password-encryption', 'enable secret'],
        },
      ],
    },
    {
      id: 'l2',
      title: 'SSH Configuration',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'Why SSH Instead of Telnet?',
          body: 'Telnet sends all data — including passwords — in cleartext over the network, making it trivially easy to capture credentials with a packet analyser. SSH (Secure Shell) encrypts the entire session. The CCNA exam requires you to know that Telnet uses TCP port 23 and SSH uses TCP port 22.',
        },
        {
          type: 'teach',
          title: 'Configuring SSH on a Cisco Device',
          body: 'Four steps are required to enable SSH: set a hostname (not "Router"), set a domain name with "ip domain-name", generate RSA keys with "crypto key generate rsa modulus 2048", and restrict VTY lines to SSH only with "transport input ssh". Create local users with "username [name] privilege 15 secret [pw]" and use "login local" on the VTY lines.',
        },
        {
          type: 'mcq',
          question: 'Which TCP port does SSH use?',
          choices: ['21', '22', '23', '443'],
          answer: '22',
        },
        {
          type: 'mcq',
          question: 'Which command restricts VTY access to SSH only, blocking Telnet?',
          choices: [
            'ip ssh version 2',
            'transport input ssh',
            'no service telnet',
            'access-class ssh in',
          ],
          answer: 'transport input ssh',
        },
        {
          type: 'tf',
          question: 'A hostname of "Router" is sufficient to generate RSA keys for SSH.',
          answer: false,
          explanation: 'Cisco IOS requires a non-default hostname and a domain name before RSA keys can be generated. Using the default hostname "Router" will cause the key generation to fail.',
        },
        {
          type: 'mcq',
          question: 'Which command generates the RSA key pair needed for SSH?',
          choices: [
            'ip ssh rsa generate',
            'crypto key generate rsa modulus 2048',
            'ssh-keygen rsa 2048',
            'key generate rsa',
          ],
          answer: 'crypto key generate rsa modulus 2048',
        },
        {
          type: 'fill',
          question: 'The command to set the domain name required before generating SSH keys is "ip _____ [name]".',
          answer: 'domain-name',
        },
        {
          type: 'mcq',
          question: 'Which IOS command forces SSH version 2 exclusively?',
          choices: [
            'transport input ssh version 2',
            'ip ssh version 2',
            'crypto ssh version 2',
            'ssh enforce version 2',
          ],
          answer: 'ip ssh version 2',
        },
        {
          type: 'tf',
          question: 'Telnet transmits all data, including passwords, in cleartext.',
          answer: true,
          explanation: 'Telnet has no encryption — every keystroke, including usernames and passwords, is sent in plaintext and can be captured by anyone with access to the network path.',
        },
        {
          type: 'wordbank',
          question: 'Order the four steps to enable SSH on a Cisco router:',
          bank: ['transport input ssh', 'crypto key generate rsa modulus 2048', 'hostname [name]', 'ip domain-name [name]'],
          answer: ['hostname [name]', 'ip domain-name [name]', 'crypto key generate rsa modulus 2048', 'transport input ssh'],
        },
      ],
    },
    {
      id: 'l3',
      title: 'CDP & LLDP',
      icon: '📡',
      questions: [
        {
          type: 'teach',
          title: 'CDP — Cisco Discovery Protocol',
          body: 'CDP is a Cisco-proprietary Layer 2 protocol that allows Cisco devices to discover directly connected neighbours. It advertises device type, IOS version, IP addresses, and interface information. CDP is enabled by default on all interfaces and is invaluable for mapping an unknown network, but should be disabled on interfaces facing untrusted networks for security.',
        },
        {
          type: 'teach',
          title: 'LLDP — The Open Standard Alternative',
          body: 'LLDP (Link Layer Discovery Protocol) is the IEEE 802.1AB open standard equivalent of CDP — it works across multi-vendor environments. LLDP is disabled by default on Cisco devices and must be enabled globally with "lldp run". Disable CDP or LLDP on individual untrusted interfaces with "no cdp enable" or "no lldp transmit" / "no lldp receive".',
        },
        {
          type: 'mcq',
          question: 'At which OSI layer does CDP operate?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 2',
        },
        {
          type: 'tf',
          question: 'CDP is enabled by default on all Cisco interfaces.',
          answer: true,
          explanation: 'CDP is enabled globally and on all interfaces by default on Cisco devices. It must be explicitly disabled — globally with "no cdp run" or per-interface with "no cdp enable".',
        },
        {
          type: 'mcq',
          question: 'Which command shows detailed CDP information including the neighbour\'s IP address and IOS version?',
          choices: [
            'show cdp',
            'show cdp neighbors',
            'show cdp neighbors detail',
            'show cdp interface',
          ],
          answer: 'show cdp neighbors detail',
        },
        {
          type: 'mcq',
          question: 'Which protocol is the open-standard, multi-vendor alternative to CDP?',
          choices: ['SNMP', 'LLDP', 'NDP', 'STP'],
          answer: 'LLDP',
        },
        {
          type: 'fill',
          question: 'The global command to enable LLDP on a Cisco device is "lldp _____".',
          answer: 'run',
        },
        {
          type: 'tf',
          question: 'LLDP is enabled by default on Cisco devices.',
          answer: false,
          explanation: 'Unlike CDP, LLDP is disabled by default on Cisco IOS devices. It must be manually enabled with the global command "lldp run".',
        },
        {
          type: 'mcq',
          question: 'Why should CDP be disabled on interfaces facing untrusted networks?',
          choices: [
            'CDP consumes too much bandwidth on external links',
            'CDP advertisements reveal device type, IOS version, and IP addresses to attackers',
            'CDP conflicts with LLDP on external interfaces',
            'CDP is not supported on WAN interfaces',
          ],
          answer: 'CDP advertisements reveal device type, IOS version, and IP addresses to attackers',
        },
        {
          type: 'mcq',
          question: 'Which command disables CDP on a single interface without affecting the rest of the device?',
          choices: ['no cdp run', 'no cdp enable', 'cdp disable', 'shutdown cdp'],
          answer: 'no cdp enable',
        },
      ],
    },
    {
      id: 'l4',
      title: 'NTP & Syslog',
      icon: '🕐',
      questions: [
        {
          type: 'teach',
          title: 'NTP — Network Time Protocol',
          body: 'NTP synchronises device clocks across the network, which is critical for accurate log timestamps, certificate validity, and security auditing. Cisco devices can act as NTP clients ("ntp server [ip]"), NTP servers, or both. NTP uses UDP port 123 and organises sources into strata — stratum 1 is a reference clock (GPS), stratum 2 syncs from stratum 1, and so on up to stratum 15.',
        },
        {
          type: 'teach',
          title: 'Syslog — Centralised Logging',
          body: 'Syslog sends log messages from network devices to a central server for storage and analysis. Messages have eight severity levels numbered 0–7: 0 = Emergencies (most severe) down to 7 = Debugging (least severe). Configure a syslog server with "logging [server-ip]" and set the minimum severity level with "logging trap [level]". Without a syslog server, logs are only kept in the device\'s limited buffer.',
        },
        {
          type: 'mcq',
          question: 'Which UDP port does NTP use?',
          choices: ['53', '69', '123', '161'],
          answer: '123',
        },
        {
          type: 'mcq',
          question: 'An NTP stratum 1 device synchronises its clock from what source?',
          choices: [
            'Another NTP server on the internet',
            'A reference clock such as GPS or atomic clock',
            'The local hardware clock',
            'A stratum 2 upstream server',
          ],
          answer: 'A reference clock such as GPS or atomic clock',
        },
        {
          type: 'tf',
          question: 'Accurate device time is important for correlating log messages during a security investigation.',
          answer: true,
          explanation: 'If devices have unsynchronised clocks, log timestamps across different devices will not align, making it extremely difficult to reconstruct the sequence of events during an incident.',
        },
        {
          type: 'mcq',
          question: 'Which syslog severity level is the most critical?',
          choices: ['Level 0 — Emergencies', 'Level 3 — Errors', 'Level 6 — Informational', 'Level 7 — Debugging'],
          answer: 'Level 0 — Emergencies',
        },
        {
          type: 'fill',
          question: 'The IOS command to point a Cisco device at an NTP server is "ntp _____ [ip-address]".',
          answer: 'server',
        },
        {
          type: 'mcq',
          question: 'Which command sets the minimum syslog severity level sent to a remote server?',
          choices: ['logging level', 'logging trap', 'logging severity', 'logging minimum'],
          answer: 'logging trap',
        },
        {
          type: 'tf',
          question: 'Syslog level 7 (Debugging) messages are more severe than level 4 (Warnings).',
          answer: false,
          explanation: 'Syslog severity levels run from 0 (most severe) to 7 (least severe). Debugging (7) is the lowest severity — it generates the most verbose output and is typically only enabled during active troubleshooting.',
        },
        {
          type: 'wordbank',
          question: 'Order these syslog severity levels from most severe (level 0) to least severe (level 3):',
          bank: ['Errors', 'Emergencies', 'Warnings', 'Critical'],
          answer: ['Emergencies', 'Critical', 'Errors', 'Warnings'],
        },
      ],
    },
  ],
};
