import type { Section } from '../../../lib/types';

export const SECTION_NAT: Section = {
  id: 'nat',
  title: 'NAT – Network Address Translation',
  icon: '🔄',
  unlockAfter: 'acls',
  lessons: [
    {
      id: 'l1',
      title: 'NAT Concepts',
      icon: '🌐',
      questions: [
        {
          type: 'teach',
          title: 'Why NAT Exists',
          body: 'NAT translates private (RFC 1918) IP addresses to public IP addresses, allowing many hosts to share a small number of public IPs. The router maintains a NAT translation table mapping inside local addresses to inside global addresses. Inside local = private IP of the internal host. Inside global = public IP used on the internet. Outside global = the public IP of the remote server.',
        },
        {
          type: 'mcq',
          question: 'What is the primary purpose of NAT?',
          choices: [
            'To encrypt traffic between networks',
            'To allow private IP addresses to communicate on the public internet',
            'To assign IP addresses via DHCP',
            'To filter traffic using access lists',
          ],
          answer: 'To allow private IP addresses to communicate on the public internet',
        },
        {
          type: 'mcq',
          question: 'Which term describes the private IP address of an internal host before NAT translation?',
          choices: ['Inside global', 'Outside local', 'Inside local', 'Outside global'],
          answer: 'Inside local',
        },
        {
          type: 'tf',
          question: 'The inside global address is the public IP address that represents the internal host on the internet.',
          answer: true,
          explanation: 'Inside global is the public-facing IP address assigned by the ISP that represents the internal host. The router translates the inside local (private) address to this inside global (public) address for outbound traffic.',
        },
        {
          type: 'mcq',
          question: 'Which RFC defines the private IP address ranges used with NAT?',
          choices: ['RFC 1918', 'RFC 2328', 'RFC 4271', 'RFC 768'],
          answer: 'RFC 1918',
        },
        {
          type: 'fill',
          question: 'The NAT term for the public IP of an internal host as seen on the internet is "inside _____".',
          answer: 'global',
        },
        {
          type: 'mcq',
          question: 'Which private address range belongs to RFC 1918?',
          choices: ['172.16.0.0–172.31.255.255', '169.254.0.0/16', '100.64.0.0/10', '240.0.0.0/4'],
          answer: '172.16.0.0–172.31.255.255',
        },
        {
          type: 'tf',
          question: 'NAT hides the internal network topology from external hosts.',
          answer: true,
          explanation: 'Because NAT translates private addresses to a public IP, external hosts only see the public IP — they have no visibility into the internal addressing scheme, which provides a layer of obscurity.',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Static and Dynamic NAT',
      icon: '📌',
      questions: [
        {
          type: 'teach',
          title: 'Static NAT vs Dynamic NAT',
          body: 'Static NAT creates a permanent one-to-one mapping between an inside local and inside global address — useful for servers that must be reachable from the internet. Configure with "ip nat inside source static [local-ip] [global-ip]". Dynamic NAT maps inside local addresses to a pool of public addresses on demand. Connections fail if the pool is exhausted. Neither type scales as well as PAT.',
        },
        {
          type: 'mcq',
          question: 'Which NAT type creates a permanent one-to-one mapping between a private and public IP?',
          choices: ['Dynamic NAT', 'PAT', 'Static NAT', 'Overload NAT'],
          answer: 'Static NAT',
        },
        {
          type: 'mcq',
          question: 'Which command creates a static NAT mapping for inside host 192.168.1.10 to public IP 203.0.113.5?',
          choices: [
            'ip nat inside source static 192.168.1.10 203.0.113.5',
            'ip nat static 192.168.1.10 203.0.113.5',
            'nat inside 192.168.1.10 outside 203.0.113.5',
            'ip nat source static 192.168.1.10 203.0.113.5',
          ],
          answer: 'ip nat inside source static 192.168.1.10 203.0.113.5',
        },
        {
          type: 'tf',
          question: 'Dynamic NAT maps inside hosts to public addresses from a pool on a first-come, first-served basis.',
          answer: true,
          explanation: 'Dynamic NAT draws from a configured pool of public addresses. When an inside host initiates a connection, it is assigned a free pool address. When the session ends, the address returns to the pool for reuse.',
        },
        {
          type: 'mcq',
          question: 'What happens with dynamic NAT if all public pool addresses are in use?',
          choices: [
            'The oldest session is terminated',
            'New connections from inside hosts fail',
            'The router requests more addresses from DHCP',
            'Traffic is dropped silently',
          ],
          answer: 'New connections from inside hosts fail',
        },
        {
          type: 'fill',
          question: 'The command to mark interface Gi0/1 as the NAT inside interface is "ip nat _____".',
          answer: 'inside',
        },
        {
          type: 'mcq',
          question: 'Which interface designation is applied to the router\'s WAN interface facing the internet?',
          choices: ['ip nat inside', 'ip nat outside', 'ip nat external', 'ip nat public'],
          answer: 'ip nat outside',
        },
        {
          type: 'tf',
          question: 'Both "ip nat inside" and "ip nat outside" must be configured on the router for NAT to work.',
          answer: true,
          explanation: 'NAT requires the router to know which interface is the inside (private) network and which is outside (public). Without both designations, the router cannot perform address translation.',
        },
      ],
    },
    {
      id: 'l3',
      title: 'PAT – Port Address Translation',
      icon: '📞',
      questions: [
        {
          type: 'teach',
          title: 'Many-to-One with PAT',
          body: 'PAT (Port Address Translation), also called NAT overload, maps thousands of inside hosts to a single public IP address by tracking unique source port numbers. Each session gets a unique source port, so the router can track which reply belongs to which internal host. PAT is by far the most common NAT type — it\'s what your home router uses. Configure with "ip nat inside source list [acl] interface [outside-int] overload".',
        },
        {
          type: 'mcq',
          question: 'What distinguishes different sessions in PAT when multiple hosts share one public IP?',
          choices: ['TTL values', 'Source port numbers', 'VLAN tags', 'DSCP markings'],
          answer: 'Source port numbers',
        },
        {
          type: 'mcq',
          question: 'Which keyword is added to the NAT overload (PAT) configuration command?',
          choices: ['pat', 'overload', 'dynamic', 'many-to-one'],
          answer: 'overload',
        },
        {
          type: 'tf',
          question: 'PAT allows many inside hosts to share a single public IP address.',
          answer: true,
          explanation: 'PAT (NAT overload) tracks sessions using unique source port numbers assigned to each translation. This allows thousands of internal hosts to simultaneously access the internet through a single public IP address.',
        },
        {
          type: 'mcq',
          question: 'Which command configures PAT using ACL 1 and the address of interface Gi0/0?',
          choices: [
            'ip nat inside source list 1 interface gi0/0 overload',
            'ip nat overload acl 1 interface gi0/0',
            'ip nat inside pat list 1 gi0/0',
            'ip nat source list 1 gi0/0 overload',
          ],
          answer: 'ip nat inside source list 1 interface gi0/0 overload',
        },
        {
          type: 'fill',
          question: 'PAT is also referred to as NAT _____ because many inside addresses map to one public IP.',
          answer: 'overload',
        },
        {
          type: 'mcq',
          question: 'Which command shows active NAT translations on a Cisco router?',
          choices: [
            'show nat table',
            'show ip nat translations',
            'show ip nat bindings',
            'show nat statistics',
          ],
          answer: 'show ip nat translations',
        },
        {
          type: 'tf',
          question: 'PAT can translate a maximum of 65,535 simultaneous sessions per public IP address.',
          answer: true,
          explanation: 'Since PAT tracks sessions by source port number, and TCP/UDP port numbers range from 1 to 65,535, a single public IP can theoretically support up to 65,535 simultaneous translated sessions.',
        },
        {
          type: 'mcq',
          question: 'Which command clears all dynamic NAT and PAT translations from the translation table?',
          choices: [
            'clear nat translations',
            'clear ip nat translation *',
            'no ip nat translation',
            'clear ip nat all',
          ],
          answer: 'clear ip nat translation *',
        },
      ],
    },
    {
      id: 'l4',
      title: 'NAT Verification & Troubleshooting',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Verifying NAT',
          body: 'Use "show ip nat translations" to see the NAT table — verify that inside local addresses are being translated to inside global addresses. Use "show ip nat statistics" to check the number of active translations and which interfaces are inside/outside. "debug ip nat" shows real-time translation activity. Check that the ACL used in PAT matches the correct inside hosts.',
        },
        {
          type: 'mcq',
          question: 'A host can ping the default gateway but cannot reach the internet. NAT is suspected. Which command helps verify active NAT translations?',
          choices: [
            'show ip route',
            'show ip nat translations',
            'show ip interface brief',
            'show access-lists',
          ],
          answer: 'show ip nat translations',
        },
        {
          type: 'mcq',
          question: 'Which command shows NAT statistics including inside/outside interface designations?',
          choices: [
            'show ip nat translations',
            'show ip nat statistics',
            'show ip nat table',
            'show nat details',
          ],
          answer: 'show ip nat statistics',
        },
        {
          type: 'tf',
          question: 'If the ACL referenced in the PAT command does not match the inside hosts, those hosts cannot be translated.',
          answer: true,
          explanation: 'The ACL in "ip nat inside source list [acl]" defines which inside source addresses are eligible for PAT. If the ACL is missing, wrong, or set to deny, matching hosts will not get their addresses translated and will fail to reach the internet.',
        },
        {
          type: 'mcq',
          question: 'Inside hosts can reach the internet, but external hosts cannot initiate connections to the internal web server. What NAT type is needed?',
          choices: ['Dynamic NAT', 'PAT only', 'Static NAT', 'No NAT needed'],
          answer: 'Static NAT',
        },
        {
          type: 'fill',
          question: 'The command to view real-time NAT translation activity for troubleshooting is "debug ip _____".',
          answer: 'nat',
        },
        {
          type: 'mcq',
          question: 'In a show ip nat translations output, which column shows the private IP of the inside host?',
          choices: ['Inside global', 'Inside local', 'Outside local', 'Outside global'],
          answer: 'Inside local',
        },
        {
          type: 'tf',
          question: 'Removing "ip nat inside" from an interface immediately clears all active NAT translations for that interface.',
          answer: false,
          explanation: 'Removing NAT interface designations does not automatically clear the translation table. Use "clear ip nat translation *" to remove existing translations after removing the NAT configuration.',
        },
      ],
    },
  ],
};
