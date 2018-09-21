const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GOOD':
      return {
          good: state.good + 1,
          neutral: state.neutral,
          bad: state.bad

      }
      
      case 'NEUTRAL':
      return {
          good: state.good,
          neutral: state.neutral + 1,
          bad: state.bad

      }
      
      case 'BAD':
      return {
          good: state.good,
          neutral: state.neutral,
          bad: state.bad + 1

      }
      
      case 'ZERO':
        return {
            good : 0,
            neutral : 0,
            bad : 0
        }
    }
    return state
  }
  
  export default counterReducer