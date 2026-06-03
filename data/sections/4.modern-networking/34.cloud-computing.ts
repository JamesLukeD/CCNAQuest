import type { Section } from '../../../lib/types';

export const SECTION_CLOUD_COMPUTING: Section = {
  id: 'cloud-computing',
  title: 'Cloud Computing',
  icon: '☁️',
  unlockAfter: 'qos',
  lessons: [
    {
      id: 'l1',
      title: 'Cloud Service Models',
      icon: '🌐',
      questions: [
        {
          type: 'teach',
          title: 'IaaS, PaaS, and SaaS',
          body: 'Cloud computing delivers IT resources over the internet. IaaS (Infrastructure as a Service) provides virtual compute, storage, and networking — the customer manages OS and above (e.g. AWS EC2, Azure VMs). PaaS (Platform as a Service) provides a managed platform for developers — the customer manages only applications and data (e.g. AWS Elastic Beanstalk). SaaS (Software as a Service) delivers complete applications — the provider manages everything (e.g. Microsoft 365, Salesforce).',
        },
        {
          type: 'mcq',
          question: 'Which cloud service model provides virtual machines where the customer manages the OS and applications?',
          choices: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
          answer: 'IaaS',
        },
        {
          type: 'mcq',
          question: 'Microsoft 365 (Office apps delivered via browser) is an example of which service model?',
          choices: ['IaaS', 'PaaS', 'SaaS', 'DaaS'],
          answer: 'SaaS',
        },
        {
          type: 'tf',
          question: 'With PaaS, the cloud provider manages the underlying infrastructure AND the OS, but the customer manages applications and data.',
          answer: true,
          explanation: 'PaaS abstracts infrastructure and OS management from the developer. The provider handles compute, storage, networking, and OS patching. The customer focuses only on writing and deploying their application code.',
        },
        {
          type: 'mcq',
          question: 'A developer uploads application code and the cloud provider automatically handles scaling and OS patching. Which model is this?',
          choices: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
          answer: 'PaaS',
        },
        {
          type: 'fill',
          question: 'In _____ (Software as a Service), the provider manages everything including the application itself.',
          answer: 'SaaS',
        },
        {
          type: 'tf',
          question: 'IaaS gives the customer the most control over the infrastructure compared to PaaS and SaaS.',
          answer: true,
          explanation: 'IaaS provides the lowest level of abstraction — the customer has full control over OS, middleware, applications, and data, while the provider only manages the physical hardware and hypervisor layer.',
        },
        {
          type: 'mcq',
          question: 'Which cloud model requires the customer to manage the LEAST amount of the stack?',
          choices: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
          answer: 'SaaS',
        },
      ],
    },
    {
      id: 'l2',
      title: 'Cloud Deployment Models',
      icon: '🏗️',
      questions: [
        {
          type: 'teach',
          title: 'Public, Private, Hybrid, and Community Clouds',
          body: 'Public cloud is shared infrastructure owned by a provider and accessed over the internet (AWS, Azure, GCP). Private cloud is dedicated infrastructure operated for one organisation — higher control and security, higher cost. Hybrid cloud combines public and private, with workloads running in the most appropriate environment. Community cloud is shared among organisations with similar requirements (e.g. government agencies).',
        },
        {
          type: 'mcq',
          question: 'Which cloud deployment model is dedicated to a single organisation and provides the highest level of control?',
          choices: ['Public cloud', 'Community cloud', 'Private cloud', 'Hybrid cloud'],
          answer: 'Private cloud',
        },
        {
          type: 'mcq',
          question: 'A company keeps sensitive data on-premises while using public cloud for scalable web applications. Which model is this?',
          choices: ['Public cloud', 'Private cloud', 'Community cloud', 'Hybrid cloud'],
          answer: 'Hybrid cloud',
        },
        {
          type: 'tf',
          question: 'Public cloud infrastructure is owned and managed by the customer organisation.',
          answer: false,
          explanation: 'Public cloud infrastructure (servers, storage, networking) is owned and managed by the cloud service provider (AWS, Azure, GCP). Customers consume resources as a service and pay only for what they use.',
        },
        {
          type: 'fill',
          question: '_____ cloud is shared among organisations with common requirements, such as several government departments.',
          answer: 'Community',
        },
        {
          type: 'mcq',
          question: 'Which cloud benefit allows resources to be quickly scaled up or down based on demand?',
          choices: ['CapEx reduction', 'Elasticity', 'Colocation', 'Dedicated hardware'],
          answer: 'Elasticity',
        },
        {
          type: 'tf',
          question: 'Cloud computing shifts IT spending from CapEx (capital expenditure) to OpEx (operational expenditure).',
          answer: true,
          explanation: 'Traditional on-premises infrastructure requires upfront capital investment (servers, data centres) — CapEx. Cloud replaces this with recurring subscription/consumption fees — OpEx. This improves financial flexibility and reduces large upfront costs.',
        },
        {
          type: 'mcq',
          question: 'Which cloud characteristic allows a customer to provision resources without human interaction from the provider?',
          choices: ['Broad network access', 'Resource pooling', 'On-demand self-service', 'Rapid elasticity'],
          answer: 'On-demand self-service',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Virtualisation',
      icon: '💻',
      questions: [
        {
          type: 'teach',
          title: 'Hypervisors and Virtual Machines',
          body: 'Virtualisation runs multiple VMs on one physical host by abstracting hardware. A Type 1 (bare-metal) hypervisor runs directly on hardware — no host OS. Examples: VMware ESXi, Microsoft Hyper-V, KVM. A Type 2 (hosted) hypervisor runs as an application on top of a host OS. Examples: VMware Workstation, VirtualBox. Type 1 is used in production data centres; Type 2 is used for development and testing.',
        },
        {
          type: 'mcq',
          question: 'Which hypervisor type runs directly on physical hardware without a host OS?',
          choices: ['Type 2', 'Type 1', 'Type 3', 'Hosted hypervisor'],
          answer: 'Type 1',
        },
        {
          type: 'mcq',
          question: 'Which is an example of a Type 1 (bare-metal) hypervisor?',
          choices: ['VirtualBox', 'VMware Workstation', 'VMware ESXi', 'QEMU'],
          answer: 'VMware ESXi',
        },
        {
          type: 'tf',
          question: 'Type 2 hypervisors run on top of an existing host operating system.',
          answer: true,
          explanation: 'Type 2 hypervisors (VMware Workstation, VirtualBox) are applications that run on a host OS (Windows, macOS, Linux). The host OS adds overhead compared to Type 1, making Type 2 less efficient for production workloads.',
        },
        {
          type: 'mcq',
          question: 'What is the primary advantage of virtualisation in a data centre?',
          choices: [
            'Increased physical hardware requirements',
            'Running multiple workloads on fewer physical servers',
            'Elimination of network infrastructure',
            'Dedicated hardware for each application',
          ],
          answer: 'Running multiple workloads on fewer physical servers',
        },
        {
          type: 'fill',
          question: 'VMware Workstation is an example of a Type _____ hypervisor.',
          answer: '2',
        },
        {
          type: 'tf',
          question: 'Each virtual machine has its own dedicated physical CPU and RAM.',
          answer: false,
          explanation: 'VMs share the physical host\'s CPU and RAM through the hypervisor. The hypervisor schedules CPU time and allocates memory to each VM. Physical resources are abstracted and shared, enabling consolidation.',
        },
        {
          type: 'mcq',
          question: 'Which term describes the physical server that runs a hypervisor and hosts virtual machines?',
          choices: ['Guest', 'Host', 'Controller', 'Bare metal'],
          answer: 'Host',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Cloud Networking Concepts',
      icon: '🔗',
      questions: [
        {
          type: 'teach',
          title: 'Connecting to the Cloud',
          body: 'Organisations connect to cloud providers via the public internet (low cost, variable performance), dedicated connections (AWS Direct Connect, Azure ExpressRoute — private, consistent latency), or VPN over internet. Cloud networking uses virtual routers, switches, and firewalls implemented in software. Virtual Private Cloud (VPC) / Virtual Network creates an isolated network in the public cloud where you control IP addressing, routing, and security groups.',
        },
        {
          type: 'mcq',
          question: 'Which AWS service provides a dedicated private connection to AWS bypassing the public internet?',
          choices: ['AWS VPN', 'AWS Direct Connect', 'AWS Transit Gateway', 'AWS CloudFront'],
          answer: 'AWS Direct Connect',
        },
        {
          type: 'mcq',
          question: 'What is a Virtual Private Cloud (VPC)?',
          choices: [
            'A private data centre managed by AWS',
            'An isolated virtual network within the public cloud',
            'A VPN tunnel between two offices',
            'A dedicated physical server in a cloud region',
          ],
          answer: 'An isolated virtual network within the public cloud',
        },
        {
          type: 'tf',
          question: 'Dedicated cloud connections like AWS Direct Connect offer more consistent performance than internet-based connections.',
          answer: true,
          explanation: 'Dedicated connections bypass the public internet entirely, providing consistent bandwidth, lower latency, and higher reliability. They are used when predictable performance and security are critical for cloud-hosted workloads.',
        },
        {
          type: 'mcq',
          question: 'Which cloud concept allows workload placement decisions to be made based on policy rather than manually?',
          choices: ['Colocation', 'Orchestration', 'Dedicated hardware', 'Physical networking'],
          answer: 'Orchestration',
        },
        {
          type: 'fill',
          question: 'Cloud security groups function like virtual _____ that control inbound and outbound traffic to cloud instances.',
          answer: 'firewalls',
        },
        {
          type: 'tf',
          question: 'In cloud environments, network functions like routing and firewalling are implemented in software (NFV).',
          answer: true,
          explanation: 'Network Functions Virtualisation (NFV) replaces physical network appliances with software running on standard servers. Cloud providers implement virtual routers, load balancers, and firewalls as software services within their infrastructure.',
        },
        {
          type: 'mcq',
          question: 'Which connectivity option provides the LOWEST cost for connecting a branch office to a public cloud?',
          choices: [
            'AWS Direct Connect',
            'Azure ExpressRoute',
            'VPN over the public internet',
            'Dedicated fibre to the cloud provider',
          ],
          answer: 'VPN over the public internet',
        },
      ],
    },
  ],
};
