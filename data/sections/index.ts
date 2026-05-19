// ── Fundamentals ───────────────────────────────────────────────
import { SECTION_HOST_TO_HOST }             from './1.fundamentals/1.host-to-host';
import { SECTION_CISCO_IOS }                from './1.fundamentals/2.cisco-ios';
import { SECTION_TRANSPORT_LAYER }          from './1.fundamentals/3.transport-layer';
import { SECTION_NETWORK_LAYER }            from './1.fundamentals/4.network-layer';
import { SECTION_IP_ADDRESS_CLASSES }       from './1.fundamentals/5.ip-address-classes';
import { SECTION_SUBNETTING }               from './1.fundamentals/6.subnetting';
import { SECTION_DATA_LINK_LAYER }          from './1.fundamentals/7.data-link-layer';
import { SECTION_PHYSICAL_LAYER }           from './1.fundamentals/8.physical-layer';
import { SECTION_CISCO_DEVICE_FUNCTIONS }   from './1.fundamentals/9.cisco-device-functions';
import { SECTION_LIFE_OF_A_PACKET }         from './1.fundamentals/10.life-of-a-packet';

// ── Routing & Switching ────────────────────────────────────────
import { SECTION_TROUBLESHOOTING_METHODOLOGY }  from './2.routing-switching/11.troubleshooting-methodology';
import { SECTION_ROUTER_SWITCH_BASICS }          from './2.routing-switching/12.router-switch-basics';
import { SECTION_DEVICE_MANAGEMENT }             from './2.routing-switching/13.device-management';
import { SECTION_ROUTING_FUNDAMENTALS }          from './2.routing-switching/14.routing-fundamentals';
import { SECTION_DYNAMIC_ROUTING_PROTOCOLS }     from './2.routing-switching/15.dynamic-routing-protocols';
import { SECTION_CONNECTIVITY_TROUBLESHOOTING }  from './2.routing-switching/16.connectivity-troubleshooting';
import { SECTION_IGP_FUNDAMENTALS }              from './2.routing-switching/17.igp-fundamentals';
import { SECTION_OSPF }                          from './2.routing-switching/18.ospf';
import { SECTION_VLANS }                         from './2.routing-switching/19.vlans';
import { SECTION_INTER_VLAN_ROUTING }            from './2.routing-switching/20.inter-vlan-routing';
import { SECTION_DHCP }                          from './2.routing-switching/21.dhcp';
import { SECTION_HSRP }                          from './2.routing-switching/22.hsrp';
import { SECTION_STP }                           from './2.routing-switching/23.stp';
import { SECTION_ETHERCHANNEL }                  from './2.routing-switching/24.etherchannel';

// ── Security & Services ────────────────────────────────────────
import { SECTION_SWITCH_SECURITY }               from './3.security-services/25.switch-security';
import { SECTION_ACLS }                          from './3.security-services/26.acls';
import { SECTION_NAT }                           from './3.security-services/27.nat';
import { SECTION_IPV6 }                          from './3.security-services/28.ipv6';
import { SECTION_WAN }                           from './3.security-services/29.wan';
import { SECTION_SECURITY_THREAT_LANDSCAPE }     from './3.security-services/30.security-threat-landscape';
import { SECTION_CISCO_DEVICE_SECURITY }         from './3.security-services/31.cisco-device-security';
import { SECTION_NETWORK_DEVICE_MANAGEMENT }     from './3.security-services/32.network-device-management';
import { SECTION_QOS }                           from './3.security-services/33.qos';

// ── Modern Networking ──────────────────────────────────────────
import { SECTION_CLOUD_COMPUTING }               from './4.modern-networking/34.cloud-computing';
import { SECTION_WIRELESS_NETWORKING }           from './4.modern-networking/35.wireless-networking';
import { SECTION_NETWORK_AUTOMATION }            from './4.modern-networking/36.network-automation';
import { SECTION_AI_ML }                         from './4.modern-networking/37.ai-ml';

// ── Master export ──────────────────────────────────────────────
export const ALL_SECTIONS = [
  // Fundamentals
  SECTION_HOST_TO_HOST,
  SECTION_CISCO_IOS,
  SECTION_TRANSPORT_LAYER,
  SECTION_NETWORK_LAYER,
  SECTION_IP_ADDRESS_CLASSES,
  SECTION_SUBNETTING,
  SECTION_DATA_LINK_LAYER,
  SECTION_PHYSICAL_LAYER,
  SECTION_CISCO_DEVICE_FUNCTIONS,
  SECTION_LIFE_OF_A_PACKET,
  // Routing & Switching
  SECTION_TROUBLESHOOTING_METHODOLOGY,
  SECTION_ROUTER_SWITCH_BASICS,
  SECTION_DEVICE_MANAGEMENT,
  SECTION_ROUTING_FUNDAMENTALS,
  SECTION_DYNAMIC_ROUTING_PROTOCOLS,
  SECTION_CONNECTIVITY_TROUBLESHOOTING,
  SECTION_IGP_FUNDAMENTALS,
  SECTION_OSPF,
  SECTION_VLANS,
  SECTION_INTER_VLAN_ROUTING,
  SECTION_DHCP,
  SECTION_HSRP,
  SECTION_STP,
  SECTION_ETHERCHANNEL,
  // Security & Services
  SECTION_SWITCH_SECURITY,
  SECTION_ACLS,
  SECTION_NAT,
  SECTION_IPV6,
  SECTION_WAN,
  SECTION_SECURITY_THREAT_LANDSCAPE,
  SECTION_CISCO_DEVICE_SECURITY,
  SECTION_NETWORK_DEVICE_MANAGEMENT,
  SECTION_QOS,
  // Modern Networking
  SECTION_CLOUD_COMPUTING,
  SECTION_WIRELESS_NETWORKING,
  SECTION_NETWORK_AUTOMATION,
  SECTION_AI_ML,
];
