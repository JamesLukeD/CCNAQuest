import type { Section } from '../../../lib/types';

export const SECTION_CISCO_DEVICE_SECURITY: Section = {
  id: 'cisco-device-security',
  title: 'Cisco Device Security',
  icon: '🔐',
  unlockAfter: 'security-threat-landscape',
  lessons: [
    {
      id: 'l1',
      title: 'AAA Framework',
      icon: '🔑',
      questions: [
        {
          type: 'teach',
          title: 'Authentication, Authorization, and Accounting',
          body: 'AAA is the security framework for controlling access to network devices. Authentication — verifies who you are (username/password, certificate). Authorization — determines what you are allowed to do (commands, privilege levels). Accounting — records what you did (logs all commands for audit). Cisco supports local AAA (credentials on the device) or server-based AAA using TACACS+ or RADIUS.',
        },
        {
          type: 'mcq',
          question: 'What does the second "A" in AAA stand for?',
          choices: ['Authentication', 'Authorization', 'Accounting', 'Auditing'],
          answer: 'Authorization',
        },
        {
          type: 'mcq',
          question: 'Which AAA component records which commands an administrator executed for audit purposes?',
          choices: ['Authentication', 'Authorization', 'Accounting', 'Access control'],
          answer: 'Accounting',
        },
        {
          type: 'tf',
          question: 'TACACS+ encrypts the entire AAA packet, while RADIUS only encrypts the password field.',
          answer: true,
          explanation: 'TACACS+ encrypts the entire body of every AAA packet, providing stronger security. RADIUS only encrypts the password in the Access-Request packet — all other attributes are sent in clear text.',
        },
        {
          type: 'mcq',
          question: 'Which protocol uses TCP port 49 for AAA communications?',
          choices: ['RADIUS', 'TACACS+', 'LDAP', 'Kerberos'],
          answer: 'TACACS+',
        },
        {
          type: 'mcq',
          question: 'Which protocol uses UDP ports 1812 (authentication) and 1813 (accounting) for AAA?',
          choices: ['TACACS+', 'LDAP', 'RADIUS', 'Kerberos'],
          answer: 'RADIUS',
        },
        {
          type: 'fill',
          question: 'The AAA component that verifies who you are before granting access is called _____.',
          answer: 'Authentication',
        },
        {
          type: 'tf',
          question: 'RADIUS separates authentication and authorization into independent processes.',
          answer: false,
          explanation: 'RADIUS combines authentication and authorization into a single process. TACACS+ separates them, which is why TACACS+ is preferred for device administration — it allows finer-grained authorization per command.',
        },
        {
          type: 'mcq',
          question: 'Which AAA protocol is preferred for network device administration due to per-command authorization support?',
          choices: ['RADIUS', 'TACACS+', 'LDAP', 'Kerberos'],
          answer: 'TACACS+',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Local Authentication and Login Controls',
      icon: '🔏',
      questions: [
        {
          type: 'teach',
          title: 'Securing Console and VTY Access',
          body: 'Local authentication stores usernames and passwords on the device. Create users with "username [name] privilege [0-15] secret [password]". Configure VTY lines to use local authentication with "login local". Set idle timeout with "exec-timeout [min] [sec]". Protect against brute-force with "login block-for [sec] attempts [n] within [sec]" — this temporarily blocks all login attempts after too many failures.',
        },
        {
          type: 'mcq',
          question: 'Which command blocks all logins for 60 seconds after 3 failed attempts within 30 seconds?',
          choices: [
            'login block-for 60 attempts 3 within 30',
            'login lockout 60 tries 3 time 30',
            'security login block 60 3 30',
            'login timer 60 max-attempts 3',
          ],
          answer: 'login block-for 60 attempts 3 within 30',
        },
        {
          type: 'mcq',
          question: 'Which command creates a local user with privilege level 15 and a hashed password?',
          choices: [
            'username admin privilege 15 password Cisco123',
            'username admin privilege 15 secret Cisco123',
            'user admin level 15 secret Cisco123',
            'local user admin priv 15 Cisco123',
          ],
          answer: 'username admin privilege 15 secret Cisco123',
        },
        {
          type: 'tf',
          question: '"exec-timeout 0 0" on a VTY line means the session will never time out due to inactivity.',
          answer: true,
          explanation: '"exec-timeout 0 0" disables the idle timeout, keeping the session open indefinitely. This is a security risk — best practice is to set a short timeout (e.g. "exec-timeout 10 0" for 10 minutes).',
        },
        {
          type: 'mcq',
          question: 'Which VTY configuration command requires local username/password authentication?',
          choices: ['login', 'login local', 'aaa authentication login', 'local login'],
          answer: 'login local',
        },
        {
          type: 'fill',
          question: 'Privilege level _____ provides full access to all IOS commands, including global configuration mode.',
          answer: '15',
        },
        {
          type: 'tf',
          question: '"username admin password Cisco123" stores the password in MD5-hashed form.',
          answer: false,
          explanation: '"password" stores the credential in plain text (or reversibly encrypted with service password-encryption). Only the "secret" keyword uses a strong hash (MD5 or scrypt). Always use "secret" for local user accounts.',
        },
        {
          type: 'mcq',
          question: 'Which command sets a 5-minute idle timeout on VTY lines?',
          choices: [
            'timeout 5 0',
            'exec-timeout 5 0',
            'idle-timeout 5',
            'session-timeout 300',
          ],
          answer: 'exec-timeout 5 0',
        },
      ],
    },
    {
      id: 'l3',
      title: 'SSH and Secure Management',
      icon: '💻',
      questions: [
        {
          type: 'teach',
          title: 'Replacing Telnet with SSH',
          body: 'Telnet sends all data including passwords in plain text — never use it on production networks. SSH encrypts all traffic. Configure SSH: (1) set hostname, (2) set domain name "ip domain-name", (3) generate RSA keys "crypto key generate rsa" (1024+ bits), (4) set "transport input ssh" on VTY lines. Use "ip ssh version 2" to enforce SSHv2 only. Restrict management access with ACLs on VTY lines.',
        },
        {
          type: 'mcq',
          question: 'Which command enforces only SSHv2 on a Cisco router?',
          choices: ['ssh version 2', 'ip ssh version 2', 'transport ssh version 2', 'ip ssh v2 only'],
          answer: 'ip ssh version 2',
        },
        {
          type: 'mcq',
          question: 'Which VTY command prevents Telnet connections and only allows SSH?',
          choices: [
            'no telnet',
            'transport input ssh',
            'login ssh only',
            'ssh access-only',
          ],
          answer: 'transport input ssh',
        },
        {
          type: 'tf',
          question: 'Telnet encrypts the username and password during login.',
          answer: false,
          explanation: 'Telnet sends all data — including usernames, passwords, and commands — in clear text. Anyone capturing traffic on the network can see everything. SSH must be used instead for secure remote management.',
        },
        {
          type: 'mcq',
          question: 'What is the minimum recommended RSA key size for SSH on Cisco IOS?',
          choices: ['512 bits', '768 bits', '1024 bits', '256 bits'],
          answer: '1024 bits',
        },
        {
          type: 'fill',
          question: 'The command to generate RSA keys for SSH is "crypto key generate _____".',
          answer: 'rsa',
        },
        {
          type: 'mcq',
          question: 'Which command shows the current SSH configuration and version on a Cisco router?',
          choices: ['show ssh', 'show ip ssh', 'show crypto key', 'show transport'],
          answer: 'show ip ssh',
        },
        {
          type: 'tf',
          question: 'An ACL applied to VTY lines with "access-class" restricts which source IPs can connect for remote management.',
          answer: true,
          explanation: '"access-class [acl] in" on VTY lines restricts remote management access to only the IP addresses permitted by the ACL. This is a critical hardening step to prevent unauthorised management access.',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Control Plane Policing & Hardening',
      icon: '🛡️',
      questions: [
        {
          type: 'teach',
          title: 'Protecting the Control Plane',
          body: 'Network devices are vulnerable to attacks targeting their CPU — ICMP floods, routing update floods, or management traffic storms can crash a router. Control Plane Policing (CoPP) applies QoS policies to rate-limit traffic destined for the router\'s CPU. Additional hardening: disable unused services (no cdp run, no ip http server, no service finger), use encrypted protocols only, and apply ACLs to management interfaces.',
        },
        {
          type: 'mcq',
          question: 'What is the purpose of Control Plane Policing (CoPP)?',
          choices: [
            'To encrypt routing updates',
            'To rate-limit traffic destined for the router\'s CPU',
            'To filter traffic between VLANs',
            'To prioritise voice traffic in the data plane',
          ],
          answer: 'To rate-limit traffic destined for the router\'s CPU',
        },
        {
          type: 'mcq',
          question: 'Which command disables CDP globally on a Cisco router for security hardening?',
          choices: ['no cdp', 'no cdp run', 'cdp disable', 'no cdp global'],
          answer: 'no cdp run',
        },
        {
          type: 'tf',
          question: 'Disabling the HTTP server on a router ("no ip http server") is a security best practice.',
          answer: true,
          explanation: 'The Cisco HTTP server enables web-based device management, which is unnecessary in most deployments and increases the attack surface. Disabling it with "no ip http server" (and "no ip http secure-server" if not needed) is standard hardening practice.',
        },
        {
          type: 'mcq',
          question: 'Which command disables the HTTP server on a Cisco IOS device?',
          choices: ['no web server', 'no ip http server', 'http disable', 'no service http'],
          answer: 'no ip http server',
        },
        {
          type: 'fill',
          question: 'Disabling all unnecessary services and closing unused ports is referred to as device _____.',
          answer: 'hardening',
        },
        {
          type: 'mcq',
          question: 'Which command shows the privilege level of the currently logged-in user?',
          choices: ['show privilege', 'show users', 'show login', 'show access-level'],
          answer: 'show privilege',
        },
        {
          type: 'tf',
          question: '"service password-encryption" provides strong encryption equivalent to using "enable secret".',
          answer: false,
          explanation: '"service password-encryption" uses a weak Type 7 reversible cipher — it only prevents casual viewing. "enable secret" uses MD5 or stronger hashing and cannot be reversed. Always use "secret" for sensitive passwords.',
        },
        {
          type: 'mcq',
          question: 'An attacker is flooding a router with ICMP packets overwhelming its CPU. Which feature specifically mitigates this?',
          choices: ['ACLs on VTY lines', 'SSH version 2', 'Control Plane Policing (CoPP)', 'DHCP snooping'],
          answer: 'Control Plane Policing (CoPP)',
        },
      ],
    },
  ],
};
