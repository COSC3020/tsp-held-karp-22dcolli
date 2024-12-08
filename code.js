function tsp_hk(distance_matrix){
    return -1
}

/*
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


*/







function tsp_hk(distanceMatrix){

    let n = distanceMatrix.length;

    if (n <=1){
        return 0;
    }


    //remembers the subproblems
    let cache = new Map();

    function backtrack(currentCity,visitedSet){
        
        let key = "";
        //creates a new key if there isnt one alread, the key is whats left to be checked or the subset and the cuurent
        for (let city of visitedSet){
            key= (key + city + ",")
        }
        key = key.slice(0, -1) + ":" + currentCity;

        //if the works done already, just get it again with the key
        if(cache.has(key)){
            return cache.get(key);
        }

        //base case HERE
        if(visitedSet.size === 1) {

            let startCity = visitedSet.values().next().value;
            return distanceMatrix[startCity][currentCity];
        }

        let minCost = Infinity;

        //simular to augmenting path and detecting cycles to explore
        for (let nextCity of visitedSet){

            if(nextCity !== currentCity){
                //the same set but without current city
                let remainingSet = new Set();

                for (let city of visitedSet){

                    if(city !== currentCity) {
                        remainingSet.add(city);
                    }
                }
                //cost totaling recursively
                let cost = backtrack(nextCity, remainingSet) + distanceMatrix[nextCity][currentCity];
                minCost = Math.min(minCost, cost);
            }
        }

        //remember the cost for this here
        cache.set(key, minCost);
        return minCost;
    }

    let totalCost = Infinity;

    //like in detectingcycles check starting from each node/city just to make sure
    for (let startCity = 0; startCity < n; startCity++) {
        
        let visitedSet = new Set();
        for(let i=0; i < n; i++) {
            visitedSet.add(i);
        }


        visitedSet.delete(startCity);

        //cost totaling again
        let cost = backtrack(startCity, visitedSet);
        totalCost = Math.min(totalCost, cost);
    }

    return totalCost;
}


/*
let distanceMatrix1 = [[]];

console.log(heldKarpDynamic(distanceMatrix1));

let distanceMatrix2 = [[0]];

console.log(heldKarpDynamic(distanceMatrix2));

let distanceMatrix3 = 
[[0,0,0],
[0,0,0],
[0,0,0]];

console.log(heldKarpDynamic(distanceMatrix3));

let distanceMatrix4 = 
[[0,1,2],
[1,0,2],
[2,2,0]];

console.log(heldKarpDynamic(distanceMatrix4));

let distanceMatrix5 = [
    [0, 3, 4, 2, 7],
    [3, 0, 4, 6, 3],
    [4, 4, 0, 5, 8],
    [2, 6, 5, 0, 6],
    [7, 3, 8, 6, 0]
];

console.log(heldKarpDynamic(distanceMatrix5));

*/

