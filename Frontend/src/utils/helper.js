export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const getInitials = (name)=>{
    if(!name) return ""
    const words= name.split(" ")

    let initials=""

    for(let i=0; i<Math.min(words.length,2);i++){
        initials += words[i][0]
    }
    return initials.toUpperCase()
}

export const getEmptyCardMessage = (filterType)=>{
    switch(filterType){
        case "search":
            return `OOPS! No Notes Found`
        case "date":
            return `No Notes Founds In The Given Date Range`
        default:
            return `Begin your wanderlust — share your first travel experience. Click the 'Add' button Traveller ` 
    }
}