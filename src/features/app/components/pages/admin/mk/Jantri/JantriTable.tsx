import React from "react";

// items - will contain senssion entries
export default function JantriTable(props: { items?: [], fieldTotalBet?: string }) {
  const { items = [], fieldTotalBet='totalBet' } = props;

  const getSessionEntry = (numTypeId: string, num: number) => {
    const entry = (items || []).find((item: any) => {
      return item.numTypeId == numTypeId && item.num == num;
    });
    // console.log(item1)
    return entry || {};
  };

  const jodiArr = Array.from(Array(100).keys());
  const harfArr = Array.from(Array(10).keys());
  return (
    <>
      <h5 className="mt-5">Jodi</h5>
      <div className='jantriRow'>
        {jodiArr.map((_, i) => {
          const entry: any = getSessionEntry("j", i);
          // console.log(entry)
          return (
            <div className={"jantriCol"} key={i}>
              <div className='jantriColInnerTable'>
                <div className='jantriColInnerTableCell'>
                  <span className='numberTitle'>{i}</span>
                  <span className='amountTitle'>{entry[fieldTotalBet]} </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h5 className='mt-5'>Harf</h5>
      <div className='jantriRow'>
        {harfArr.map((_, i) => {
          const entry: any = getSessionEntry("h", i);
          // console.log(entry)
          return (
            <div className={"jantriCol"} key={i}>
              <div className='jantriColInnerTable'>
                <div className='jantriColInnerTableCell'>
                  <span className='numberTitle'>{i}</span>
                  <span className='amountTitle'>{entry[fieldTotalBet]} </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h5 className='mt-5'>Andar Harf</h5>
      <div className='jantriRow'>
        {harfArr.map((_, i) => {
          const entry: any = getSessionEntry("ah", i);
          // console.log(entry)
          return (
            <div className={"jantriCol"} key={i}>
              <div className='jantriColInnerTable'>
                <div className='jantriColInnerTableCell'>
                  <span className='numberTitle'>{i}</span>
                  <span className='amountTitle'>{entry[fieldTotalBet]} </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
