import React from 'react';
import Link from '../../components/Link';

const PciDssEn = () => (
  <div>
    <div className='headline'>Security</div>
    <p>
      Postpay is committed to security and the protection of all customer
      information. To accomplish this, we continue to invest significant
      resources to provide secure and reliable payment solutions for
      end-customers and retail merchants alike.
    </p>

    <div className='headline'>PCI DSS Compliance</div>
    <div className='subheadline'>
      Postpay is a validated PCI DSS Compliant Service Provider
    </div>
    <p>
      PCI security standards are technical and operational requirements set by
      the PCI Security Standards Council (PCI SSC) to protect cardholder data.
      The standards apply to all entities that store, process or transmit
      cardholder data – with guidance for software developers and manufacturers
      of applications and devices used in those transactions. The Council is
      responsible for managing the security standards, while compliance with the
      PCI set of standards is enforced by the founding members of the Council,
      American Express, Discover Financial Services, JCB International,
      MasterCard Worldwide and Visa Inc. The data standard pertains to a total
      of twelve compliance requirements represented through the following 6
      Security Controls and Processes for PCI DSS Requirements:
    </p>
    <ul>
      <li>Build and maintain a secure network</li>
      <li>Protect cardholder data</li>
      <li>Maintain a vulnerability management program</li>
      <li>Implement strong access control measures</li>
      <li>Regularly monitor and test networks</li>
      <li>Maintain an information security policy</li>
    </ul>
    <p>
      For further information please visit the official PCI org website{' '}
      <a href='//www.pcisecuritystandards.org' target='_blank'>
        www.pcisecuritystandards.org
      </a>
      .
    </p>

    <div className='subheadline'>What does this mean for end customers?</div>
    <p>
      Once the end customer agrees to Postpay terms, Postpay secures and
      protects the cardholder data according to the current applicable PCI
      standard for the life of the data needing to be retained. Postpay
      acknowledges these responsibilities as being the organization responsible
      for ensuring the safe handling and storage of sensitive customer credit
      card information and data for the Postpay services.
    </p>

    <div className='subheadline'>What does this mean for retail merchants?</div>
    <p>
      Postpay merchants must implement Postpay technology according to Postpay’s
      approved configuration. Postpay merchants effectively delegate their PCI
      DSS responsibilities for sensitive customer credit card information and
      data collected through the Postpay Merchant Agreement process and Customer
      Agreement. Merchant’s may have other PCI DSS responsibilities that are
      independent of the Postpay Merchant Agreement process. It is the
      Merchant’s sole responsibility to remain informed of their PCI obligations
      and compliance status. Merchant’s should always consult their own
      Information Security professionals to review the security of the
      merchants’ business where required. A Qualified Security Assessor should
      be consulted if the merchant manages other sensitive customer credit card
      information and data or the merchant’s implementation of Postpay
      technologies has deviated from the approved configuration.
    </p>
    <p>
      Postpay Attestation of Compliance (AOC) is available on{' '}
      <a href='mailto:compliance@postpay.io'>request</a>.
    </p>
    <p>
      Postpay’s Privacy Policy is available <Link href='/privacy'>here</Link>.
    </p>
  </div>
);

export default PciDssEn;