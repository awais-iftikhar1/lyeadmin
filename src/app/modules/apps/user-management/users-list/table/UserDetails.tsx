import React from "react";

type Props = {
  className?: string;
  userData: any;
};

const UserDetails: React.FC<Props> = ({ className, userData }) => {
  const userInfo = [
    {
      label: "Username",
      value: userData?.user?.username,
    },
    {
      label: "Email",
      value: userData?.user?.email,
    },
    {
      label: "Rank",
      value: userData?.user?.userRank?.name || "No Rank",
    },
    {
      label: "Lotteries Purchased",
      value: userData?.userLotteries,
    },
    {
      label: "Total Deposit",
      value: `$${userData?.totalDeposit}`,
    },
    {
      label: "Total Package",
      value: `$${userData?.totalPurchase}`,
    },
    {
      label: "Total Earning",
      value: `$${Math.trunc(+userData?.totalEarnings * 1000) / 1000}`,
    },
  ];
  return (
    <div className={`card ${className}`}>
      <div className="card-body form pt-0">
        {userInfo.map((item, index) => (
          <div key={index} className="row mb-3 justify-content-center">
            <label className="col-lg-4 text-start col-form-label fw-bold fs-4">
              <span >{item.label}</span>
            </label>
            <div className="offset-lg-1 col-lg-6 col-form-label">
              <p className="text-dark mb-1 fs-6">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { UserDetails };
