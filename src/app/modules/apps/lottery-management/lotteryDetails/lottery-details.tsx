import { LotteryDetailCard } from '../../../../../_metronic/partials/widgets';

type Props = {
  sold: number;
  earn: number;
  handleClose: Function;
};

const LotteryDetails = ({ sold, earn, handleClose }: Props) => {
  return (
    <>
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-5 offset-xl-1'>
          <LotteryDetailCard
            className='card-xl-stretch mb-xl-8'
            svgIcon='/media/icons/duotune/general/gen032.svg'
            color='dark'
            titleColor='primary'
            iconColor='primary'
            title='Total Sold Tickets'
            description={sold}
          />
        </div>

        <div className='col-xl-5'>
          <LotteryDetailCard
            className='card-xl-stretch mb-5 mb-xl-8'
            svgIcon='/media/icons/duotune/graphs/gra007.svg'
            color='dark'
            titleColor='primary'
            iconColor='primary'
            title='Total Earning'
            description={earn}
          />
        </div>
      </div>
    </>
  );
};

export default LotteryDetails;
