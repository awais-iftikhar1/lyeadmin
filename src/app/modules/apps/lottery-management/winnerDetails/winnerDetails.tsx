import { KTSVG } from '../../../../../_metronic/helpers';
import { LotteryWinnerCard } from '../../../../../_metronic/partials/widgets';

type Props = {
  data: any;
  handleClose: Function;
};

const WinnerDetails = ({ data, handleClose }: Props) => {
  return (
    <>
      <div className='row g-5 g-xl-8'>
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <div className='col-xl-4' key={index}>
                <LotteryWinnerCard
                  className='card-xl-stretch mb-xl-8 mb-0'
                  svgIcon='/media/icons/duotune/general/gen032.svg'
                  color='primary'
                  titleColor='primary'
                  circleColor='white'
                  title={`${item.type === 'first' ? '1st' : item.type} Prize`}
                  description={
                    item.lottery !== undefined
                      ? item.lottery?.users.username
                      : 'Not Announced'
                  }
                  country={
                    item.lottery !== undefined && item.lottery?.users.country
                  }
                  ticketNumber={
                    item.lottery !== undefined ? (
                      item.lottery?.lottery_number
                    ) : (
                      <KTSVG
                        path='/media/icons/duotune/custom/noLotto001.svg'
                        className='svg-icon-custom'
                      />
                    )
                  }
                  prize={item.amount}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default WinnerDetails;
