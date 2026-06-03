import type { Section } from '../../../lib/types';

export const SECTION_TROUBLESHOOTING_METHODOLOGY: Section = {
  id: 'troubleshooting-methodology',
  title: 'The Cisco Troubleshooting Methodology',
  icon: '🔧',
  unlockAfter: 'life-of-a-packet',
  lessons: [
    {
      id: 'l1',
      title: 'Troubleshooting Approaches',
      icon: '🔍',
      questions: [
        {
          type: 'teach',
          title: 'Why Structured Troubleshooting?',
          body: 'When a network breaks, the temptation is to start randomly changing things. Structured troubleshooting prevents this. It gives you a repeatable, efficient process that:\n\n• Isolates the problem layer by layer\n• Avoids making things worse\n• Produces documentation so others can understand what happened\n\nCisco recommends three main approaches — top-down, bottom-up, and divide-and-conquer.',
        },
        {
          type: 'teach',
          title: 'Bottom-Up Approach',
          body: 'Start at OSI Layer 1 (Physical) and work up toward Layer 7 (Application).\n\nLayer 1 → 2 → 3 → 4 → 5/6/7\n\nBest when: you suspect a physical or data link issue (cables, ports, interfaces down).\n\nDownside: slow if the problem is actually at Layer 4 or above — you check a lot of layers before reaching it.',
        },
        {
          type: 'teach',
          title: 'Top-Down Approach',
          body: 'Start at OSI Layer 7 (Application) and work down toward Layer 1.\n\nLayer 7 → 6 → 5 → 4 → 3 → 2 → 1\n\nBest when: the problem is reported by a user ("the website won\'t load") — start at the application and rule out higher layers first.\n\nDownside: if the problem is a cable, you\'ve checked everything above it first.',
        },
        {
          type: 'teach',
          title: 'Divide-and-Conquer Approach',
          body: 'Start testing somewhere in the middle of the OSI stack — typically Layer 3 (Network). Based on your result, move up or down.\n\n• If ping works → problem is Layer 4+\n• If ping fails → problem is Layer 3 or below\n\nBest when: you have some information about the problem and can make an educated starting guess. This is the fastest approach in most real-world scenarios.',
        },
        {
          type: 'mcq',
          question: 'Which troubleshooting approach starts at OSI Layer 1 and works upward?',
          choices: ['Top-down', 'Bottom-up', 'Divide-and-conquer', 'Follow-the-path'],
          answer: 'Bottom-up',
        },
        {
          type: 'mcq',
          question: 'A user reports "the web app is slow." Which troubleshooting approach is most logical to start with?',
          choices: ['Bottom-up', 'Top-down', 'Divide-and-conquer', 'Outside-in'],
          answer: 'Top-down',
        },
        {
          type: 'tf',
          question: 'The divide-and-conquer approach always starts at OSI Layer 4.',
          answer: false,
          explanation: 'Divide-and-conquer typically starts at Layer 3 (Network) using a ping test, but the starting layer can vary based on available information about the fault.',
        },
        {
          type: 'mcq',
          question: 'Which troubleshooting approach is generally fastest when you have partial information about a network problem?',
          choices: ['Bottom-up', 'Top-down', 'Divide-and-conquer', 'Trial-and-error'],
          answer: 'Divide-and-conquer',
        },
        {
          type: 'tf',
          question: 'Bottom-up troubleshooting begins by testing physical connectivity such as cables and interfaces.',
          answer: true,
          explanation: 'Bottom-up starts at OSI Layer 1 (Physical) — checking cables, link lights, and interface status before moving to higher layers.',
        },
        {
          type: 'mcq',
          question: 'A network engineer suspects a routing problem between two sites. Which OSI layer should they focus on first?',
          choices: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'],
          answer: 'Layer 3',
        },
        {
          type: 'wordbank',
          question: 'Order these OSI layers from bottom-up troubleshooting start to finish (first to last):',
          bank: ['Network', 'Physical', 'Application', 'Data Link'],
          answer: ['Physical', 'Data Link', 'Network', 'Application'],
        },
      ],
    },
    {
      id: 'l2',
      title: 'The Cisco 7-Step Process',
      icon: '📋',
      questions: [
        {
          type: 'teach',
          title: 'Cisco\'s Systematic Approach',
          body: 'Cisco defines a 7-step structured troubleshooting process:\n\n1. Define the problem\n2. Gather information\n3. Analyse the information\n4. Eliminate possible causes\n5. Propose a hypothesis\n6. Test the hypothesis\n7. Solve the problem and document\n\nIf your hypothesis test fails, you loop back to step 4 and eliminate that cause, then propose a new hypothesis.',
        },
        {
          type: 'teach',
          title: 'Step 1 — Define the Problem',
          body: 'Before touching anything, clearly state what is wrong. Use the symptom-cause framework:\n\n• What is the symptom? ("Users cannot reach 192.168.10.0/24")\n• When did it start? (After a config change? After maintenance?)\n• What changed recently? (New device? Updated route? Changed ACL?)\n• Who is affected? (All users? One subnet? One host?)\n\nA well-defined problem is already half solved.',
        },
        {
          type: 'teach',
          title: 'Step 2 — Gather Information',
          body: 'Collect data from the devices involved. Key sources:\n\n• show commands on routers/switches\n• Log files (syslog, SNMP traps)\n• Baseline documentation (what was normal?)\n• User reports and tickets\n• Network diagrams\n\nGather before changing — changes destroy the evidence trail.',
        },
        {
          type: 'teach',
          title: 'Steps 4–7: Hypothesis and Testing',
          body: 'After analysing your gathered data:\n\n4. Eliminate causes: rule out anything the evidence disproves\n5. Propose a hypothesis: your best explanation of the root cause\n6. Test it: make ONE change and observe the effect\n7. If solved: document the problem, cause, and fix\n   If not solved: loop back to step 4\n\nAlways make ONE change at a time — multiple simultaneous changes make it impossible to know what actually fixed the problem.',
        },
        {
          type: 'mcq',
          question: 'How many steps are in the Cisco structured troubleshooting process?',
          choices: ['5', '6', '7', '9'],
          answer: '7',
        },
        {
          type: 'mcq',
          question: 'In the Cisco troubleshooting process, what should you do if your hypothesis test fails?',
          choices: [
            'Start over from Step 1',
            'Loop back to Step 4 and eliminate that cause',
            'Escalate immediately to Cisco TAC',
            'Reload the device',
          ],
          answer: 'Loop back to Step 4 and eliminate that cause',
        },
        {
          type: 'tf',
          question: 'You should make multiple configuration changes simultaneously to resolve a problem faster.',
          answer: false,
          explanation: 'Making one change at a time is essential. Multiple simultaneous changes make it impossible to determine which change resolved (or worsened) the problem.',
        },
        {
          type: 'mcq',
          question: 'Which step of the Cisco troubleshooting process involves running show commands and checking logs?',
          choices: ['Define the problem', 'Gather information', 'Test the hypothesis', 'Document the solution'],
          answer: 'Gather information',
        },
        {
          type: 'tf',
          question: 'Documentation is the final step in the Cisco troubleshooting process.',
          answer: true,
          explanation: 'Step 7 is to solve the problem AND document it — recording the symptoms, root cause, and fix so others can benefit from the resolution.',
        },
        {
          type: 'fill',
          question: 'The Cisco troubleshooting step where you state "users on VLAN 10 cannot reach the internet since 09:00 today" is called _____ the problem.',
          answer: 'defining',
        },
        {
          type: 'mcq',
          question: 'Why is gathering information before making changes important?',
          choices: [
            'To generate a change request ticket',
            'Because changes destroy the evidence trail',
            'To ensure management approval',
            'To verify the running configuration is saved',
          ],
          answer: 'Because changes destroy the evidence trail',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Diagnostic Show Commands',
      icon: '💻',
      questions: [
        {
          type: 'teach',
          title: 'Your Troubleshooting Toolkit',
          body: 'Cisco IOS has a powerful set of show commands for fault isolation. The most important for troubleshooting:\n\n• show ip interface brief — quick view of all interfaces and status\n• show interfaces [int] — detailed stats including errors\n• show ip route — routing table\n• show running-config — current configuration\n• show version — IOS version, uptime, memory\n• show cdp neighbors — discover adjacent Cisco devices',
        },
        {
          type: 'teach',
          title: 'show ip interface brief',
          body: 'The most frequently used show command. Output columns:\n\nInterface | IP-Address | OK? | Method | Status | Protocol\n\nKey statuses:\n• "up / up" → Layer 1 and Layer 2 both functional\n• "up / down" → Physical link up but protocol (Layer 2) down — often a keepalive or encapsulation mismatch\n• "administratively down / down" → Interface has been manually shut down with the shutdown command\n• "down / down" → Physical problem (no cable, other end down)',
        },
        {
          type: 'teach',
          title: 'show interfaces',
          body: 'Gives detailed statistics on a single interface. Key fields to check:\n\n• Input/output errors → signal quality issues\n• CRC errors → frame corruption, often a duplex mismatch or bad cable\n• Collisions → duplex problem (should be 0 on modern switched networks)\n• Input queue drops → interface overwhelmed (congestion or rate mismatch)\n\nCommand: show interfaces GigabitEthernet0/0',
        },
        {
          type: 'mcq',
          question: 'An interface shows "administratively down / down" in show ip interface brief. What is the cause?',
          choices: [
            'The cable is unplugged',
            'The interface has been shut down with the shutdown command',
            'There is a duplex mismatch',
            'The IP address is missing',
          ],
          answer: 'The interface has been shut down with the shutdown command',
        },
        {
          type: 'mcq',
          question: 'Which show command gives the quickest overview of all interface statuses on a router?',
          choices: [
            'show interfaces',
            'show ip interface brief',
            'show running-config',
            'show version',
          ],
          answer: 'show ip interface brief',
        },
        {
          type: 'mcq',
          question: 'An interface is "up / down." What does this most likely indicate?',
          choices: [
            'No cable is connected',
            'The interface is shut down',
            'Physical link is up but Layer 2 protocol has failed',
            'The IP address is misconfigured',
          ],
          answer: 'Physical link is up but Layer 2 protocol has failed',
        },
        {
          type: 'tf',
          question: 'CRC errors shown in "show interfaces" output are typically caused by a duplex mismatch or a bad cable.',
          answer: true,
          explanation: 'CRC errors indicate frame corruption. Common causes include duplex mismatch (one side auto-negotiates full-duplex, the other is forced half) or a physically damaged cable.',
        },
        {
          type: 'mcq',
          question: 'Which command would you use to check the IOS version and device uptime?',
          choices: ['show ip interface brief', 'show version', 'show running-config', 'show cdp neighbors'],
          answer: 'show version',
        },
        {
          type: 'mcq',
          question: 'You want to see the directly connected and learned routes on a router. Which command do you use?',
          choices: ['show interfaces', 'show ip arp', 'show ip route', 'show ip interface brief'],
          answer: 'show ip route',
        },
        {
          type: 'tf',
          question: '"show cdp neighbors" can help you discover the hostnames and connected interfaces of adjacent Cisco devices.',
          answer: true,
          explanation: 'CDP (Cisco Discovery Protocol) is a Layer 2 protocol. "show cdp neighbors" reveals adjacent Cisco device hostnames, platform, local/remote interface, and capabilities.',
        },
        {
          type: 'fill',
          question: 'The show command that displays interface errors such as CRC errors and input queue drops in detail is show _____.',
          answer: 'interfaces',
        },
        {
          type: 'wordbank',
          question: 'Match the interface status to its meaning — order from "fully working" to "manually disabled":',
          bank: ['up / up', 'up / down', 'down / down', 'administratively down / down'],
          answer: ['up / up', 'up / down', 'down / down', 'administratively down / down'],
        },
      ],
    },
    {
      id: 'l4',
      title: 'Ping, Traceroute & Debug',
      icon: '📡',
      questions: [
        {
          type: 'teach',
          title: 'Ping — Layer 3 Reachability Test',
          body: 'Ping uses ICMP Echo Request / Echo Reply to test Layer 3 connectivity between two hosts.\n\nOutput symbols:\n• ! → success (ICMP reply received)\n• . → timeout (no reply within the wait period)\n• U → destination unreachable (router sent back an ICMP unreachable message)\n• Q → source quench\n\nA successful ping confirms: Layers 1, 2, and 3 are all functional between the two hosts.',
        },
        {
          type: 'teach',
          title: 'Extended Ping',
          body: 'Standard ping uses the outgoing interface address as the source. Extended ping lets you control:\n\n• Source IP address (test specific paths)\n• Repeat count (default is 5)\n• Datagram size (default is 100 bytes — use larger to test MTU)\n• Timeout (default 2 seconds)\n\nRun from privileged EXEC mode, type "ping" and press Enter without an IP address to enter extended mode.',
        },
        {
          type: 'teach',
          title: 'Traceroute — Path Discovery',
          body: 'Traceroute maps the Layer 3 path from source to destination by incrementing the TTL field and recording ICMP Time Exceeded responses from each hop.\n\nCisco IOS output symbols:\n• IP address → that hop responded\n• * → no response within timeout (not always a problem — some routers drop ICMP)\n• !H → administratively prohibited (ACL blocking)\n\nCommand: traceroute 8.8.8.8\nFrom a PC: tracert 8.8.8.8 (Windows) / traceroute 8.8.8.8 (Linux/Mac)',
        },
        {
          type: 'teach',
          title: 'Debug Commands — Use With Caution',
          body: 'Debug commands provide real-time output of protocol activity on a Cisco device.\n\nCommon examples:\n• debug ip icmp — shows ICMP events\n• debug ip routing — shows routing table changes\n• debug ip ospf events — shows OSPF adjacency events\n\n⚠️ WARNING: Debug can generate massive output that consumes CPU and makes a router unresponsive. Always use with filters where possible, and turn off with "undebug all" or "no debug all" when done.',
        },
        {
          type: 'mcq',
          question: 'What does a "!" symbol mean in Cisco ping output?',
          choices: [
            'The packet timed out',
            'The destination was unreachable',
            'ICMP Echo Reply was received successfully',
            'The source IP is wrong',
          ],
          answer: 'ICMP Echo Reply was received successfully',
        },
        {
          type: 'mcq',
          question: 'A ping returns all "." symbols. What does this most likely indicate?',
          choices: [
            'The host is reachable',
            'The host is responding with ICMP unreachable',
            'Packets are timing out — no reply received',
            'The ping source IP is wrong',
          ],
          answer: 'Packets are timing out — no reply received',
        },
        {
          type: 'tf',
          question: 'A successful ping test confirms that Layers 1, 2, and 3 are all functional.',
          answer: true,
          explanation: 'ICMP operates at Layer 3. A successful ping means the physical link (L1), frame delivery (L2), and IP routing (L3) are all working between the source and destination.',
        },
        {
          type: 'mcq',
          question: 'What protocol does ping use?',
          choices: ['TCP', 'UDP', 'ICMP', 'ARP'],
          answer: 'ICMP',
        },
        {
          type: 'mcq',
          question: 'What is the default repeat count for a standard Cisco IOS ping?',
          choices: ['1', '3', '5', '10'],
          answer: '5',
        },
        {
          type: 'mcq',
          question: 'Traceroute works by incrementing which IP header field to record each hop along the path?',
          choices: ['Protocol', 'TTL (Time to Live)', 'DSCP', 'Fragment offset'],
          answer: 'TTL (Time to Live)',
        },
        {
          type: 'mcq',
          question: 'In Cisco traceroute output, what does "* * *" for a hop typically indicate?',
          choices: [
            'The hop is unreachable and the path ends here',
            'The router at that hop did not respond within the timeout',
            'The destination was reached',
            'An ACL is blocking all traffic',
          ],
          answer: 'The router at that hop did not respond within the timeout',
        },
        {
          type: 'tf',
          question: 'Debug commands should be used freely on production routers because they help diagnose problems quickly.',
          answer: false,
          explanation: 'Debug commands can generate enormous output that consumes CPU and can make a production router unresponsive. They should be used carefully, with filters, and always disabled with "undebug all" immediately after use.',
        },
        {
          type: 'mcq',
          question: 'Which command stops all active debug output on a Cisco device?',
          choices: ['no debug', 'debug stop', 'undebug all', 'debug disable'],
          answer: 'undebug all',
        },
        {
          type: 'fill',
          question: 'Extended ping is entered by typing _____ at the privileged EXEC prompt and pressing Enter without an IP address.',
          answer: 'ping',
        },
        {
          type: 'mcq',
          question: 'What advantage does extended ping provide over standard ping?',
          choices: [
            'It uses TCP instead of ICMP for more reliable testing',
            'It allows you to set the source IP, repeat count, size, and timeout',
            'It bypasses ACLs automatically',
            'It works at Layer 2 instead of Layer 3',
          ],
          answer: 'It allows you to set the source IP, repeat count, size, and timeout',
        },
      ],
    },
  ],
};
