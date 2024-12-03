function tsp_hk(distance_matrix) {

    let n = distance_matrix.length;

    //asked replit ai tool for help with the syntax for creating the the table I wanted
    let table = Array.from({length: 1 << n},() => Array(n).fill(Infinity ));
    
    //base case
    table[1][0] = 0; 
    
    //start iterating
    for(let visitedSubset =1; visitedSubset < (1 << n); visitedSubset++){

        for (let curCity = 0; curCity < n; curCity++){
            //used replit ai tool to help get the sytax right in order to skip if city isnt in the subset
            if(!(visitedSubset & (1 << curCity))) continue;

            for( let nextCity=0; nextCity < n; nextCity++){
                //used the replit example above to write this skip too(don't know if I need to mark this but I will)
                if ((visitedSubset & (1 << nextCity)) || curCity === nextCity) continue;

                let nextVisitedSubset = visitedSubset | (1 << nextCity);
                
                //used replit ai tool to help me fix this line, I didn't know how to fix it but my original was causing the final result to always be Infinity So I knew it was wrong
                table[nextVisitedSubset][nextCity] = Math.min(table[nextVisitedSubset][nextCity], table[visitedSubset][curCity] + distance_matrix[curCity][nextCity]);
            }
        }
    }

    let finalCitySubset =(1 <<n) -1;
    let sPath = Infinity;

    for(let endCity = 1;endCity <n;endCity++){
        sPath = Math.min(sPath,table[finalCitySubset][endCity]);

    }
    return sPath;










}

