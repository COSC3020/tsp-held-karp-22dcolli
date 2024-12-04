function tsp_hk(distance_matrix) {

    let n = distance_matrix.length;

    if (n <=1){
        return 0;
    }

    
    let sPath = Infinity;


    for(let startCity = 0; startCity < n; startCity++){

        let table = [];
        //used replit ai to help get the syntax for the table I wanted, specifically it helped me use (1 << n) here
        for(let i=0; i< (1 << n); i++){
            table[i]= Array(n).fill(Infinity);
        }

        //new basecase
        table[1 << startCity][startCity] = 0;

        for(let visitedSubset =1; visitedSubset < (1 << n); visitedSubset++){

            for (let curCity = 0; curCity < n; curCity++){
                //used replit ai tool to help get the sytax right in order to skip if city isnt in the subset
                if(!(visitedSubset & (1 << curCity))) continue;
    
                for( let nextCity=0; nextCity < n; nextCity++){
                    //used the replit example above to write this skip too(don't know if I need to mark this but I will)
                    if ((visitedSubset & (1 << nextCity)) || curCity === nextCity) continue;
    
                    let nextVisitedSubset = visitedSubset | (1 << nextCity);
                    
                    //used replit ai tool to help me fix this line, I didn't know how to fix it but my original was causing the final result to always be Infinity So I knew it was wrong
                    table[nextVisitedSubset][nextCity] = Math.min(table[nextVisitedSubset][nextCity], (table[visitedSubset][curCity] + distance_matrix[curCity][nextCity]));
                }
            }
        }
        let finalCitySubset =(1 <<n) -1;

        for(let endCity = 1;endCity <n;endCity++){

            if(endCity !== startCity){

                sPath = Math.min(sPath,table[finalCitySubset][endCity]);
            }
        }
    }
    
    return sPath; 
}

/*
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];


console.log(tsp_hk(dm));
*/
