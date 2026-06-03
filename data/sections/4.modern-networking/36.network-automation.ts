import type { Section } from '../../../lib/types';

export const SECTION_NETWORK_AUTOMATION: Section = {
  id: 'network-automation',
  title: 'Network Automation and Programmability',
  icon: '🤖',
  unlockAfter: 'wireless-networking',
  lessons: [
    {
      id: 'l1',
      title: 'Traditional vs SDN',
      icon: '🔄',
      questions: [
        {
          type: 'teach',
          title: 'Software-Defined Networking',
          body: 'Traditional networks configure each device individually via CLI — slow, error-prone, and hard to scale. SDN (Software-Defined Networking) separates the control plane (routing decisions) from the data plane (packet forwarding) and centralises control in a software controller. The controller communicates with devices via southbound APIs (e.g. OpenFlow, NETCONF). Northbound APIs expose the network to applications and orchestration tools.',
        },
        {
          type: 'mcq',
          question: 'What does SDN separate that traditional networking keeps combined in each device?',
          choices: [
            'Management plane and data plane',
            'Control plane and data plane',
            'Physical layer and logical layer',
            'Routing table and MAC table',
          ],
          answer: 'Control plane and data plane',
        },
        {
          type: 'mcq',
          question: 'Which API direction allows the SDN controller to communicate with and program network devices?',
          choices: ['Northbound API', 'Eastbound API', 'Southbound API', 'Westbound API'],
          answer: 'Southbound API',
        },
        {
          type: 'tf',
          question: 'In SDN, the control plane runs distributed across all individual network devices.',
          answer: false,
          explanation: 'SDN centralises the control plane in a software controller. Individual devices retain the data plane (packet forwarding) but defer routing decisions to the centralised controller, removing the need for distributed control plane protocols on each device.',
        },
        {
          type: 'mcq',
          question: 'Which SDN API allows applications and orchestration tools to interact with the SDN controller?',
          choices: ['Southbound API', 'Northbound API', 'OpenFlow API', 'NETCONF API'],
          answer: 'Northbound API',
        },
        {
          type: 'fill',
          question: 'OpenFlow is a common _____ API used between an SDN controller and network devices.',
          answer: 'southbound',
        },
        {
          type: 'tf',
          question: 'Cisco DNA Center is an example of an SDN controller for enterprise campus networks.',
          answer: true,
          explanation: 'Cisco DNA (Digital Network Architecture) Center is Cisco\'s enterprise SDN controller. It provides centralised management, automation, analytics, and policy enforcement across campus and WAN infrastructure.',
        },
        {
          type: 'mcq',
          question: 'Which is a key benefit of SDN over traditional CLI-based network management?',
          choices: [
            'Requires more physical devices',
            'Enables centralised, programmatic control and faster configuration changes',
            'Removes the need for IP routing',
            'Eliminates the need for physical cabling',
          ],
          answer: 'Enables centralised, programmatic control and faster configuration changes',
        },
      ],
    },
    {
      id: 'l2',
      title: 'REST APIs',
      icon: '🔗',
      questions: [
        {
          type: 'teach',
          title: 'REST API Fundamentals',
          body: 'REST (Representational State Transfer) APIs use HTTP methods to interact with network systems. GET retrieves data. POST creates a new resource. PUT replaces/updates a resource. DELETE removes a resource. PATCH partially updates a resource. REST APIs exchange data in JSON or XML format. Cisco DNA Center, IOS-XE, and most modern network platforms expose REST APIs for automation.',
        },
        {
          type: 'mcq',
          question: 'Which HTTP method is used to retrieve data from a REST API without modifying anything?',
          choices: ['POST', 'PUT', 'GET', 'DELETE'],
          answer: 'GET',
        },
        {
          type: 'mcq',
          question: 'Which HTTP method creates a new resource via a REST API?',
          choices: ['GET', 'PUT', 'DELETE', 'POST'],
          answer: 'POST',
        },
        {
          type: 'tf',
          question: 'REST APIs typically use JSON or XML as their data exchange format.',
          answer: true,
          explanation: 'REST APIs use structured data formats for requests and responses. JSON (JavaScript Object Notation) is the most common modern format due to its readability and compact size. XML is also supported on many legacy network platforms.',
        },
        {
          type: 'mcq',
          question: 'Which HTTP status code indicates a successful REST API request?',
          choices: ['404', '500', '200', '403'],
          answer: '200',
        },
        {
          type: 'fill',
          question: 'REST APIs use _____ as their transport protocol for sending requests and receiving responses.',
          answer: 'HTTP',
        },
        {
          type: 'mcq',
          question: 'Which HTTP method replaces an entire existing resource in a REST API?',
          choices: ['GET', 'POST', 'PUT', 'PATCH'],
          answer: 'PUT',
        },
        {
          type: 'tf',
          question: 'A REST API DELETE request is idempotent — calling it multiple times has the same effect as calling it once.',
          answer: true,
          explanation: 'Idempotent means repeated calls produce the same result. DELETE is idempotent: deleting a resource that no longer exists returns a 404, but the state of the resource (deleted) is unchanged after the first successful call. GET and PUT are also idempotent; POST is not.',
        },
      ],
    },
    {
      id: 'l3',
      title: 'Data Formats',
      icon: '📄',
      questions: [
        {
          type: 'teach',
          title: 'JSON, XML, and YAML',
          body: 'Network automation tools exchange structured data. JSON (JavaScript Object Notation) uses key-value pairs in curly braces — easy to read, widely supported by REST APIs. XML (eXtensible Markup Language) uses tags like HTML — more verbose, used by NETCONF. YAML (YAML Ain\'t Markup Language) uses indentation — very human-readable, used by Ansible playbooks. All three can represent the same data; the choice depends on the tool or API.',
        },
        {
          type: 'mcq',
          question: 'Which data format does Ansible use for its playbooks?',
          choices: ['JSON', 'XML', 'YAML', 'CSV'],
          answer: 'YAML',
        },
        {
          type: 'mcq',
          question: 'Which data format uses opening and closing tags (e.g. <interface>) and is used by NETCONF?',
          choices: ['JSON', 'YAML', 'TOML', 'XML'],
          answer: 'XML',
        },
        {
          type: 'tf',
          question: 'JSON uses curly braces {} for objects and square brackets [] for arrays.',
          answer: true,
          explanation: 'JSON syntax: objects are enclosed in {} with key: value pairs separated by commas; arrays use []. Example: {"interface": "GigabitEthernet0/1", "vlans": [10, 20, 30]}. This format is compact and widely supported by REST APIs.',
        },
        {
          type: 'mcq',
          question: 'Which data format is the MOST human-readable and relies on indentation for structure?',
          choices: ['JSON', 'XML', 'YAML', 'Binary'],
          answer: 'YAML',
        },
        {
          type: 'fill',
          question: 'NETCONF uses _____ as its data encoding format for device configuration.',
          answer: 'XML',
        },
        {
          type: 'mcq',
          question: 'Which data format is most commonly returned by modern REST APIs?',
          choices: ['XML', 'CSV', 'YAML', 'JSON'],
          answer: 'JSON',
        },
        {
          type: 'tf',
          question: 'YAML files are sensitive to indentation — incorrect indentation causes parsing errors.',
          answer: true,
          explanation: 'YAML uses indentation (spaces, never tabs) to denote hierarchy. A misplaced space changes the structure of the data. This makes YAML easy to read but careful formatting is essential to avoid syntax errors in Ansible playbooks.',
        },
      ],
    },
    {
      id: 'l4',
      title: 'Configuration Management Tools',
      icon: '🛠️',
      questions: [
        {
          type: 'teach',
          title: 'Ansible, Puppet, and Chef',
          body: 'Configuration management tools automate device configuration at scale. Ansible is agentless (connects via SSH/API), uses YAML playbooks, and is simple to learn — widely used for network automation. Puppet and Chef are agent-based: a daemon runs on each managed device and pulls configuration from a central server. Puppet uses its own DSL; Chef uses Ruby. Ansible is the most common choice for network device automation.',
        },
        {
          type: 'mcq',
          question: 'Which configuration management tool is agentless and uses SSH to connect to managed devices?',
          choices: ['Puppet', 'Chef', 'Ansible', 'SaltStack'],
          answer: 'Ansible',
        },
        {
          type: 'mcq',
          question: 'What file format do Ansible playbooks use?',
          choices: ['JSON', 'XML', 'Ruby', 'YAML'],
          answer: 'YAML',
        },
        {
          type: 'tf',
          question: 'Puppet and Chef require an agent to be installed on each managed device.',
          answer: true,
          explanation: 'Puppet and Chef use a client-server model where an agent daemon runs on each managed node, periodically pulling and enforcing configuration from the central Puppet Master or Chef Server. This differs from Ansible\'s agentless push model.',
        },
        {
          type: 'mcq',
          question: 'Which Ansible concept describes a single file containing tasks to automate on managed hosts?',
          choices: ['Module', 'Role', 'Playbook', 'Inventory'],
          answer: 'Playbook',
        },
        {
          type: 'fill',
          question: 'Ansible connects to network devices using _____ by default for configuration management.',
          answer: 'SSH',
        },
        {
          type: 'mcq',
          question: 'What is the Ansible inventory file used for?',
          choices: [
            'Storing YAML task definitions',
            'Defining the list of managed hosts and groups',
            'Encrypting credentials with Ansible Vault',
            'Logging playbook execution output',
          ],
          answer: 'Defining the list of managed hosts and groups',
        },
        {
          type: 'tf',
          question: 'Infrastructure as Code (IaC) allows network configurations to be version-controlled in a source repository.',
          answer: true,
          explanation: 'Storing network configurations as code (YAML playbooks, Terraform files, etc.) in Git enables versioning, peer review, rollback, and change auditing — applying software development best practices to network operations.',
        },
      ],
    },
  ],
};
