import { KTSVG } from '../../../../../_metronic/helpers';
import { SelectWinnerCard } from '../../../../../_metronic/partials/widgets';
import { IWinners } from '../lottery-list/lottery-winner';

type Props = {
  addClass?: Function;
  data: IWinners[];
};

const SelectWinner = ({ addClass, data }: Props) => {
  // Ascending Order
  data.sort((item1: { prize: string }, item2: { prize: string }) => {
    const firstItem = item1.prize.toUpperCase();
    const secondItem = item2.prize.toUpperCase();
    return firstItem > secondItem ? 1 : -1;
  });  

  return (
    <>
      <div className={`row g-4 g-xl-8 ${addClass}`}>
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <div className='col-xl-4' key={index}>
                <SelectWinnerCard
                  className='card-xl-stretch mb-xl-8 mt-4'
                  ticketNumber={
                    item.lottery_no !== undefined ? (
                      item.lottery_no
                    ) : (
                      <KTSVG
                        path='/media/icons/duotune/custom/noLotto001.svg'
                        className='svg-icon-custom'
                      />
                    )
                  }
                  color='dark'
                  titleColor='primary'
                  circleColor='white'
                  title={`${item.prize} Prize`}
                  descriptionColor=''
                  description={
                    item.amount !== undefined ? item.amount : 'No lottery set'
                  }
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SelectWinner;
