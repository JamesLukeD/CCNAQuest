import type { Section } from '../../../lib/types';

export const SECTION_ACLS: Section = {
  id: 'acls',
  title: 'ACLs – Access Control Lists',
  icon: '📝',
  unlockAfter: 'switch-security',
  lessons: [
    {
      id: 'l1',
      title: 'Standard ACLs',
      icon: '📝',
      questions: [
        {
          type: 'teach',
          title: 'Standard ACLs — Source Address Only',
          body: 'Standard ACLs filter traffic based on source IP address only. They use numbers 1–99 (or 1300–1999 expanded). Because they can only match source IP, they should be placed as close to the destination as possible to avoid blocking too much traffic. The syntax is: "access-list [1-99] permit|deny [source] [wildcard]". Every ACL has an implicit "deny any" at the end.',
        },
        {
          type: 'mcq',
          question: 'Standard ACLs filter traffic based on which field?',
          choices: ['Destination IP only', 'Source IP only', 'Source and destination IP', 'TCP/UDP port numbers'],
          answer: 'Source IP only',
        },
        {
          type: 'mcq',
          question: 'What is the valid numbered range for standard ACLs?',
          choices: ['1–99', '100–199', '1–199', '200–299'],
          answer: '1–99',
        },
        {
          type: 'tf',
          question: 'Standard ACLs should be placed as close to the source as possible.',
          answer: false,
          explanation: 'Standard ACLs can only match source IP, so placing them near the source could block traffic to all destinations. Best practice is to place standard ACLs close to the destination to minimise unintended blocking.',
        },
        {
          type: 'mcq',
          question: 'Which command creates standard ACL 10 permitting the host 192.168.1.1?',
          choices: [
            'access-list 10 permit host 192.168.1.1',
            'access-list 10 permit 192.168.1.1 255.255.255.255',
            'ip access-list 10 permit 192.168.1.1',
            'standard acl 10 permit 192.168.1.1',
          ],
          answer: 'access-list 10 permit host 192.168.1.1',
        },
        {
          type: 'fill',
          question: 'Every ACL has an implicit "deny _____" at the end that drops all unmatched traffic.',
          answer: 'any',
        },
        {
          type: 'tf',
          question: 'The wildcard mask 0.0.0.255 matches all hosts in a /24 subnet.',
          answer: true,
          explanation: 'A wildcard mask is the inverse of a subnet mask. 0.0.0.255 means the last octet can be anything (0–255), matching all 256 hosts in a /24 network. A 0-bit means "must match"; a 1-bit means "any value".',
        },
        {
          type: 'mcq',
          question: 'What wildcard mask matches only the single host 10.1.1.5?',
          choices: ['255.255.255.0', '0.0.0.255', '0.0.0.0', '255.255.255.255'],
          answer: '0.0.0.0',
        },
        {
          type: 'mcq',
          question: 'ACLs are processed in which order?',
          choices: [
            'Last entry first',
            'Alphabetically',
            'Top-down — first match wins',
            'Most specific entry last',
          ],
          answer: 'Top-down — first match wins',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Extended ACLs',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Extended ACLs — Granular Filtering',
          body: 'Extended ACLs filter on source IP, destination IP, protocol (IP/TCP/UDP/ICMP), and source/destination port numbers. They use numbers 100–199 (or 2000–2699 expanded). Because they can match destination precisely, place them as close to the source as possible to block unwanted traffic early. Syntax: "access-list [100-199] permit|deny [protocol] [src] [wildcard] [dst] [wildcard] [eq port]".',
        },
        {
          type: 'mcq',
          question: 'What is the numbered range for extended ACLs?',
          choices: ['1–99', '100–199', '200–299', '1–199'],
          answer: '100–199',
        },
        {
          type: 'mcq',
          question: 'Extended ACLs should be placed as close to which location as possible?',
          choices: ['The destination', 'The source', 'The network core', 'Any router interface'],
          answer: 'The source',
        },
        {
          type: 'tf',
          question: 'Extended ACLs can match on TCP/UDP port numbers.',
          answer: true,
          explanation: 'Extended ACLs can match source/destination IP, protocol (TCP/UDP/ICMP/IP), and source/destination port numbers. This allows granular control such as blocking HTTP (port 80) from specific hosts while allowing other traffic.',
        },
        {
          type: 'mcq',
          question: 'Which command creates an extended ACL entry permitting TCP from any source to 192.168.1.10 on port 80?',
          choices: [
            'access-list 100 permit tcp any host 192.168.1.10 eq 80',
            'access-list 100 permit http any 192.168.1.10',
            'access-list 100 permit tcp 192.168.1.10 eq 80',
            'access-list 100 tcp any 192.168.1.10 port 80',
          ],
          answer: 'access-list 100 permit tcp any host 192.168.1.10 eq 80',
        },
        {
          type: 'fill',
          question: 'The ACL keyword "eq" is used to match a specific _____ number.',
          answer: 'port',
        },
        {
          type: 'mcq',
          question: 'Which protocol keyword in an extended ACL matches all IP traffic regardless of protocol?',
          choices: ['tcp', 'udp', 'ip', 'any'],
          answer: 'ip',
        },
        {
          type: 'tf',
          question: 'Named ACLs and numbered ACLs provide the same filtering functionality.',
          answer: true,
          explanation: 'Named ACLs (using "ip access-list standard|extended [name]") provide the same filtering as numbered ACLs but with a descriptive name and the ability to delete individual entries without rewriting the whole list.',
        },
        {
          type: 'mcq',
          question: 'How do you create a named extended ACL called "BLOCK-FTP"?',
          choices: [
            'access-list extended BLOCK-FTP',
            'ip access-list extended BLOCK-FTP',
            'named acl BLOCK-FTP extended',
            'ip extended-acl BLOCK-FTP',
          ],
          answer: 'ip access-list extended BLOCK-FTP',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Applying ACLs to Interfaces',
      icon: '🔌',
      questions: [
        {
          type: 'teach',
          title: 'Inbound vs Outbound ACL Direction',
          body: 'Apply an ACL to an interface with "ip access-group [acl] in|out". Inbound (in) filters traffic as it enters the interface — traffic is checked before the router processes it. Outbound (out) filters traffic as it leaves the interface — after routing. Only one ACL per direction per interface is allowed. Traffic from the router itself is never filtered by outbound ACLs.',
        },
        {
          type: 'mcq',
          question: 'Which command applies ACL 100 to Gi0/0 filtering inbound traffic?',
          choices: [
            'ip access-group 100 inbound',
            'ip access-group 100 in',
            'access-list 100 apply gi0/0 in',
            'ip access-list 100 in',
          ],
          answer: 'ip access-group 100 in',
        },
        {
          type: 'mcq',
          question: 'How many ACLs per direction can be applied to a single router interface?',
          choices: ['1', '2', '4', 'Unlimited'],
          answer: '1',
        },
        {
          type: 'tf',
          question: 'An inbound ACL checks traffic before the router makes a routing decision.',
          answer: true,
          explanation: 'Inbound ACLs filter traffic as it arrives at the interface, before the router looks up the destination in the routing table. This is more efficient as denied packets are discarded immediately without consuming routing resources.',
        },
        {
          type: 'mcq',
          question: 'Which command shows the ACLs applied to all interfaces on a router?',
          choices: [
            'show ip access-lists',
            'show ip interface brief',
            'show ip interface',
            'show access-group',
          ],
          answer: 'show ip interface',
        },
        {
          type: 'fill',
          question: 'The command to apply named ACL "CORP" outbound on an interface is "ip access-group CORP _____".',
          answer: 'out',
        },
        {
          type: 'tf',
          question: 'An outbound ACL on an interface will filter traffic generated by the router itself (e.g. ping from the router).',
          answer: false,
          explanation: 'Outbound ACLs do not filter traffic originating from the router itself. They only filter traffic that is being routed through the interface. To filter locally-generated traffic, use an inbound ACL on the corresponding interface.',
        },
        {
          type: 'mcq',
          question: 'Which command shows match counts (how many packets matched each ACL entry)?',
          choices: [
            'show ip interface',
            'show ip access-lists',
            'show access-group counters',
            'debug ip access-list',
          ],
          answer: 'show ip access-lists',
        },
      ],
    },
    {
      id: 'l4',
      title: 'ACL Troubleshooting',
      icon: '🔧',
      questions: [
        {
          type: 'teach',
          title: 'Common ACL Mistakes',
          body: 'The most common ACL mistakes: forgetting the implicit deny-all (blocking valid traffic), placing permits after denies for the same traffic (never reached — ACL is top-down first-match), applying the ACL in the wrong direction (in vs out), or using the wrong wildcard mask. Always verify with "show ip access-lists" to check match counters. Use "remark" entries to document ACL purpose.',
        },
        {
          type: 'mcq',
          question: 'Traffic is being unexpectedly blocked by an ACL. Which command shows match counters to identify which entry is matching?',
          choices: ['show ip interface', 'show ip access-lists', 'show access-group', 'debug ip acl'],
          answer: 'show ip access-lists',
        },
        {
          type: 'tf',
          question: 'Adding a new entry to a numbered ACL inserts it in sequence position order.',
          answer: false,
          explanation: 'Numbered ACLs append new entries to the end by default — you cannot insert entries in the middle. Named ACLs and IOS 12.3+ sequence numbers allow insertion. To reorder a numbered ACL, you must delete and recreate it.',
        },
        {
          type: 'mcq',
          question: 'An ACL has "permit 192.168.1.0 0.0.0.255" followed by "deny host 192.168.1.5". What happens to traffic from 192.168.1.5?',
          choices: [
            'It is denied because deny is more specific',
            'It is permitted because the permit entry is first and ACLs match top-down',
            'It is denied because the implicit deny matches',
            'Both entries match and the traffic is dropped',
          ],
          answer: 'It is permitted because the permit entry is first and ACLs match top-down',
        },
        {
          type: 'mcq',
          question: 'Which command removes the entire numbered ACL 101 from the router?',
          choices: [
            'delete access-list 101',
            'no access-list 101',
            'clear access-list 101',
            'no ip access-list 101',
          ],
          answer: 'no access-list 101',
        },
        {
          type: 'fill',
          question: 'To add a descriptive comment to an ACL, use the "access-list [n] _____" keyword followed by text.',
          answer: 'remark',
        },
        {
          type: 'mcq',
          question: 'An ACL applied inbound on the interface facing the internet should have which entry to allow return web traffic (TCP established sessions)?',
          choices: [
            'permit tcp any any eq 80',
            'permit tcp any any established',
            'permit tcp any established',
            'permit ip any any',
          ],
          answer: 'permit tcp any any established',
        },
        {
          type: 'tf',
          question: 'You can apply both a standard ACL and an extended ACL in the inbound direction on the same interface simultaneously.',
          answer: false,
          explanation: 'Only one ACL per protocol per direction per interface is allowed. Applying a second ACL inbound replaces the first one. To combine filtering, merge the rules into a single ACL.',
        },
        {
          type: 'mcq',
          question: 'Which ACL entry permits all ICMP traffic from any source to any destination?',
          choices: [
            'access-list 101 permit ip any any',
            'access-list 101 permit icmp any any',
            'access-list 10 permit icmp any any',
            'access-list 101 permit udp any any',
          ],
          answer: 'access-list 101 permit icmp any any',
        },
      ],
    },
  ],
};
