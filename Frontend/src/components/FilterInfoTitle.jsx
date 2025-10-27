import moment from "moment"
import { IoMdClose } from "react-icons/io"


const FilterInfoTitle = ({filterType, filterDate, onClear}) => {

  const DateRangeChip = ({date})=>{
        const startDate = date?.from ? moment(date.from).format("Do MMM YYYY"):"N/A"
        const endDate = date?.to? moment(date.to).format("Do MMM YYYY"):"N/A"

        return(
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-sm">
                <p className="text-xs font-medium">{startDate} - {endDate}</p>

                <button className="cursor-pointer" onClick={onClear}><IoMdClose/> </button>
            </div>

        )
    }
  
    return (

    filterType && (
        <div className="mb-5">
            {filterType==="search"?(
                <h3 className="text-lg font-medium">Search Results</h3>
            ):(
                <div className="items-center gap-2 ">
                    <h3 className="text-lg font-medium">Travel Stories</h3>

                    <DateRangeChip date={filterDate}/>
                </div>
            )}
        </div>
    )

    
  )
}

export default FilterInfoTitle