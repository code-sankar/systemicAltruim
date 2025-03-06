import React from "react";

function RewardsSection() {
  // Replace these with your actual icon paths & reward texts
  const rewards = [
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae0f56f2bdcaefd17dfb0_icons8-salary-100.png",
      text: "Competitive Salary",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae0f56e32a2b11cb90771_icons8-funding-100.png",
      text: ">$10,000 in Company Funding",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae0f56499a033884a417e_icons8-equity-100.png",
      text: "2% Founder Equity",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae2d9fa700f0bce8284f3_aws.png",
      text: ">$10,000 AWS Credits",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae0f56f2bdcaefd17dfb7_icons8-chat-gpt-100.png",
      text: "$2,000 OpenAI Credits",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae3f61195ced8cfc850c8_ibm.png",
      text: "$2,000 Twilio Credits",
    },
    {
      icon: "https://cdn.prod.website-files.com/623ae64112adcf772da9687e/676ae0f508ad153ee0fc9169_icons8-twilio-is-a-cloud-communications-platform-as-a-service-company-100.png",
      text: "$1,000 Airtable Credits",
    },
  ];

  return (
    <section className="bg-[#0d0a1a] text-white py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Startupathon Success Comes with Extraordinary Rewards
      </h2>

      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-6">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="w-40 h-40 bg-[#1a132b] rounded-lg flex flex-col items-center justify-center p-4 text-center shadow-md"
          >
            {/* Icon */}
            <img
              src={reward.icon}
              alt="Reward Icon"
              className="mb-2 h-10 w-auto"
            />
            {/* Label */}
            <p className="text-sm">{reward.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RewardsSection;
