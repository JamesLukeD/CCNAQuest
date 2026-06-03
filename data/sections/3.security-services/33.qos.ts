import type { Section } from '../../../lib/types';

export const SECTION_QOS: Section = {
  id: 'qos',
  title: 'QoS – Quality of Service',
  icon: '📊',
  unlockAfter: 'network-device-management',
  lessons: [
    {
      id: 'l1',
      title: 'Why QoS Matters',
      icon: '🎧',
      questions: [
        {
          type: 'teach',
          title: 'Bandwidth, Delay, Jitter, and Loss',
          body: 'QoS manages network resources to ensure time-sensitive traffic (voice, video) gets preferential treatment over less critical traffic (bulk data, email). The four key metrics: Bandwidth — available data rate. Delay — time to deliver a packet. Jitter — variation in delay (critical for voice — target under 30ms). Packet loss — dropped packets. Without QoS on a congested link, all traffic competes equally, causing voice calls to sound choppy.',
        },
        {
          type: 'mcq',
          question: 'Which QoS metric refers to the variation in packet delivery delay?',
          choices: ['Bandwidth', 'Throughput', 'Jitter', 'Latency'],
          answer: 'Jitter',
        },
        {
          type: 'mcq',
          question: 'Which type of traffic is MOST sensitive to delay and jitter?',
          choices: ['Email', 'File transfer (FTP)', 'Voice (VoIP)', 'Web browsing'],
          answer: 'Voice (VoIP)',
        },
        {
          type: 'tf',
          question: 'Without QoS, all traffic on a congested link is treated equally regardless of application type.',
          answer: true,
          explanation: 'Without QoS, routers and switches use FIFO (First In, First Out) queuing, treating all packets equally. This means a large file transfer can consume all bandwidth and cause voice packets to be delayed or dropped.',
        },
        {
          type: 'mcq',
          question: 'What is the recommended maximum one-way delay for VoIP traffic?',
          choices: ['10ms', '30ms', '150ms', '500ms'],
          answer: '150ms',
        },
        {
          type: 'fill',
          question: 'QoS manages network resources to give _____ traffic preferential treatment on congested links.',
          answer: 'time-sensitive',
        },
        {
          type: 'tf',
          question: 'QoS is only needed on high-speed links such as 10 Gbps or higher.',
          answer: false,
          explanation: 'QoS is needed wherever congestion can occur — particularly at WAN links or uplinks that aggregate traffic from many sources. Even a 100 Mbps link can become congested if it carries mixed voice, video, and data traffic.',
        },
        {
          type: 'mcq',
          question: 'Which QoS issue causes voice calls to sound robotic or choppy?',
          choices: ['High bandwidth utilisation', 'Excessive jitter', 'Low packet loss', 'Large MTU'],
          answer: 'Excessive jitter',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Classification and Marking',
      icon: '🏷️',
      questions: [
        {
          type: 'teach',
          title: 'Classifying and Marking Traffic',
          body: 'QoS classification identifies traffic types. Marking stamps a QoS value on packets so downstream devices can treat them accordingly without re-inspecting each packet. Layer 3 marking: DSCP (Differentiated Services Code Point) — 6 bits in the IP ToS byte. Common values: EF (46) for voice, AF41 (34) for video, CS0 (0) for best-effort. Layer 2 marking: CoS (Class of Service) — 3-bit 802.1Q field on trunk links (0–7).',
        },
        {
          type: 'mcq',
          question: 'Which field is used for Layer 3 QoS marking in modern networks?',
          choices: ['IP Precedence', 'DSCP', 'CoS', 'VLAN ID'],
          answer: 'DSCP',
        },
        {
          type: 'mcq',
          question: 'What is the recommended DSCP value for VoIP voice traffic?',
          choices: ['AF41', 'CS0', 'EF (46)', 'CS3'],
          answer: 'EF (46)',
        },
        {
          type: 'tf',
          question: 'CoS markings are carried in the 802.1Q header on Ethernet trunk links.',
          answer: true,
          explanation: 'Class of Service (CoS) is a 3-bit field in the 802.1Q VLAN tag, used for Layer 2 QoS marking on trunk links. It provides 8 priority values (0–7). CoS values are lost when traffic leaves a trunk and moves to an access port.',
        },
        {
          type: 'mcq',
          question: 'Which QoS action stamps packets with a DSCP value to indicate their priority?',
          choices: ['Queuing', 'Policing', 'Marking', 'Shaping'],
          answer: 'Marking',
        },
        {
          type: 'fill',
          question: 'DSCP uses _____ bits of the IP ToS byte for QoS marking.',
          answer: '6',
        },
        {
          type: 'mcq',
          question: 'What DSCP value represents best-effort (no QoS treatment) traffic?',
          choices: ['EF (46)', 'AF41 (34)', 'CS0 (0)', 'AF11 (10)'],
          answer: 'CS0 (0)',
        },
        {
          type: 'tf',
          question: 'The trust boundary defines where devices should trust and accept QoS markings from attached devices.',
          answer: true,
          explanation: 'The trust boundary is typically set at the IP phone or access switch. Markings from endpoints (PCs) are generally not trusted and are re-marked at the switch. Traffic from IP phones is usually trusted because phones mark VoIP correctly.',
        },
        {
          type: 'mcq',
          question: 'Where is the QoS trust boundary typically placed in an enterprise network?',
          choices: [
            'At the WAN edge router',
            'At the internet firewall',
            'At the access layer switch near IP phones',
            'At the distribution layer switch',
          ],
          answer: 'At the access layer switch near IP phones',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Queuing and Scheduling',
      icon: '🟥',
      questions: [
        {
          type: 'teach',
          title: 'CBWFQ and LLQ',
          body: 'Queuing manages how packets are served when an interface is congested. CBWFQ (Class-Based Weighted Fair Queuing) creates queues per traffic class and guarantees minimum bandwidth percentages. LLQ (Low Latency Queuing) adds a strict priority queue to CBWFQ for voice traffic — priority queue packets are always served first, ensuring minimal delay. LLQ is the recommended queuing method for networks with voice and video.',
        },
        {
          type: 'mcq',
          question: 'Which queuing mechanism adds a strict priority queue to CBWFQ for voice traffic?',
          choices: ['WFQ', 'FIFO', 'LLQ', 'PQ'],
          answer: 'LLQ',
        },
        {
          type: 'mcq',
          question: 'What does CBWFQ guarantee for each configured traffic class?',
          choices: [
            'A minimum bandwidth percentage',
            'Zero delay and zero jitter',
            'Unlimited bandwidth during congestion',
            'Priority queue access',
          ],
          answer: 'A minimum bandwidth percentage',
        },
        {
          type: 'tf',
          question: 'FIFO queuing is the default on most interfaces and treats all traffic equally.',
          answer: true,
          explanation: 'First In, First Out (FIFO) is the default queuing method. Packets are served in the order they arrive with no differentiation by type or priority. Under congestion, voice traffic competes equally with bulk data.',
        },
        {
          type: 'mcq',
          question: 'What is the risk of using a strict priority queue (LLQ) without policing the priority class?',
          choices: [
            'Voice traffic may be dropped',
            'The priority queue can starve lower-priority queues',
            'Jitter increases for voice traffic',
            'DSCP markings are stripped',
          ],
          answer: 'The priority queue can starve lower-priority queues',
        },
        {
          type: 'fill',
          question: 'LLQ combines _____ with a strict priority queue to serve time-sensitive traffic first.',
          answer: 'CBWFQ',
        },
        {
          type: 'tf',
          question: 'Queuing only takes effect when an interface is congested.',
          answer: true,
          explanation: 'When an interface has available bandwidth, all packets are forwarded immediately regardless of QoS configuration. Queuing policies only activate when the interface output queue is full and packets must wait to be transmitted.',
        },
        {
          type: 'mcq',
          question: 'Which queuing method is recommended for enterprise networks carrying voice, video, and data?',
          choices: ['FIFO', 'WFQ', 'LLQ (CBWFQ with priority queue)', 'Simple priority queuing'],
          answer: 'LLQ (CBWFQ with priority queue)',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Policing vs Shaping',
      icon: '🔧',
      questions: [
        {
          type: 'teach',
          title: 'Traffic Policing and Shaping',
          body: 'Policing and shaping both enforce a maximum traffic rate, but behave differently when traffic exceeds the limit. Policing drops (or re-marks) excess packets immediately — instant enforcement, no delay added. Shaping buffers excess packets and sends them later at the contracted rate — smoother delivery but adds delay and memory usage. Use policing on ingress (customer edge) and shaping on egress toward the WAN to match the service provider\'s contracted rate.',
        },
        {
          type: 'mcq',
          question: 'What does a traffic policer do when traffic exceeds the configured rate?',
          choices: [
            'Buffers the excess packets and sends them later',
            'Drops or re-marks the excess packets immediately',
            'Increases the interface bandwidth temporarily',
            'Moves the traffic to a lower-priority queue',
          ],
          answer: 'Drops or re-marks the excess packets immediately',
        },
        {
          type: 'mcq',
          question: 'What does a traffic shaper do when traffic exceeds the configured rate?',
          choices: [
            'Drops excess packets immediately',
            'Re-marks DSCP values',
            'Buffers excess packets and releases them at the contracted rate',
            'Adds jitter to smooth the traffic',
          ],
          answer: 'Buffers excess packets and releases them at the contracted rate',
        },
        {
          type: 'tf',
          question: 'Traffic shaping introduces additional delay because it buffers excess packets.',
          answer: true,
          explanation: 'Shaping holds excess packets in a buffer and releases them at the contracted rate, which creates delay. This is acceptable for bulk data but unacceptable for real-time voice/video traffic, which should be placed in the LLQ priority queue.',
        },
        {
          type: 'mcq',
          question: 'Where is traffic shaping typically applied on a WAN edge router?',
          choices: [
            'Inbound on the LAN interface',
            'Outbound on the WAN interface toward the service provider',
            'Inbound on the WAN interface',
            'On the loopback interface',
          ],
          answer: 'Outbound on the WAN interface toward the service provider',
        },
        {
          type: 'fill',
          question: 'Traffic policing _____ excess packets, while shaping buffers them.',
          answer: 'drops',
        },
        {
          type: 'mcq',
          question: 'Which QoS action re-marks DSCP from EF to CS0 on traffic exceeding a policed rate?',
          choices: [
            'Police action: drop',
            'Police action: transmit',
            'Police action: set-dscp-transmit',
            'Shape action: re-mark',
          ],
          answer: 'Police action: set-dscp-transmit',
        },
        {
          type: 'tf',
          question: 'Policing is preferred over shaping for real-time voice traffic because it avoids adding buffer delay.',
          answer: true,
          explanation: 'Voice traffic is extremely delay-sensitive. Policing drops excess voice packets (which is better than delaying them), while shaping would buffer them and introduce jitter. Voice traffic should be sized so it never exceeds its policed rate.',
        },
        {
          type: 'mcq',
          question: 'Which Cisco IOS framework is used to configure QoS classification, marking, queuing, policing, and shaping?',
          choices: ['QoS policy-map', 'Modular QoS CLI (MQC)', 'AutoQoS', 'Traffic shaper IOS'],
          answer: 'Modular QoS CLI (MQC)',
        },
      ],
    },
  ],
};
