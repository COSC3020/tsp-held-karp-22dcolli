# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.
## Plagarism Statement

All exercises must contain the following statement:
“I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.”

## Note
I did not complete this excersise last semester, so I am attempting this completely from scratch. I used this video "Held Karp Dynamic Programming Algorithm for the Traveling Salesman Problem Example" (https://www.youtube.com/watch?v=6jqlBDYNrL0) as an example for my algorithm, the video itself has no code, the way he navigated and explained the problem made sense to me so it helped to see it computed by hand.
I also used bitmasking in my algorithm but didn't know fully how it operated and the syntax so I asked chatGPT "what is a bitmask and how would it represent cities" and it gave me this verbatum "What Is a Bitmask?
A bitmask is a way to represent subsets of a set using binary numbers. Each bit in the binary number corresponds to whether an element is included in the subset:

1: The element is included.
0: The element is not included.
Example of Cities
Suppose we have 4 cities: A, B, C, and D. These cities can be numbered as 0, 1, 2, and 3.

Using a bitmask:

Binary 0001 (Decimal 1): Only city A (city 0) is in a subset.
Binary 1011 (Decimal 11): Cities A, B, and D (cities 0, 1, 3) are a subset.
Binary 1111 (Decimal 15): All cities are in a subset." 
Finally, I used replit ai tool to help me with some syntax questions(all marked in code) in particular the syntax for creating the initial table and for desired skipping.


## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

#### worst-case asymptotic time complexity:
The worst case here, would be if the algorithm had to work through all the subsets of the city set which would be $2^n$ subsets depending on the amount of cities. Then on top of that, the innermost two for loops represent that in each of the subsets you have to iterate over all the potential "curCity" and the potential "nexCity" which combined would be $n^2$. So overall the worst case time complexity would be $\Theta(2^n * n^2)$

#### worst-case asymptotic memory complexity:
For my algorithm the memory complexity centers around the table contents I believe, with there being a row for each city subset($2^n$) and each column being $n$ because they represent each city as the current city in each of the subsets. Together that leaves a worst-case asymptotic memory complexity of $\Theta(2^n * n)$.

# Update:

## New Note:

For this implementation of the algorithm I read these web articles, "JavaScript Memoization" (https://www.geeksforgeeks.org/javascript-memoization/), "JavaScript Array Reference" (https://www.w3schools.com/jsref/jsref_obj_array.asp), and more specifically through that initial reference page these two, "JavaScriptArray keys()"(https://www.w3schools.com/jsref/jsref_keys.asp) and "JavaScript Array maps()"(https://www.w3schools.com/jsref/jsref_map.asp). I also used some simular logic as in Augmenting Path and Detecting Cycle which is marked inside.

#### NEW worst-case asymptotic time complexity:

I believe that this implementation has a simular worst case time complexity as the other implementation, with the worst case scenario being the same for both in that you'd be doing the maximum amount of work. Here though, my reasoning is that, the work for checking all subsets would require $n$ time for subset, and then the portion of the new implementation that I see is partially simular to detecting cycles that re-checks from every city would mean another $n$ amount of time. Essentiall for all subsets( the amount of subsets being $2^n$) for as many cities($n$) checking through each subset($n$) I think. Making the overall worst case complexity $\Theta(2^n * n^2)$.

#### NEW worst-case asymptotic memory complexity:

Also simularly to the other implementation, remembering each of the subsets in the cache would take $n$ space and the total amount of possible subsets being $2^n$ giving an overall worst case complexity of $\Theta(2^n * n)$.



