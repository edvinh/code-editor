const java = 
`public class Main {
  public static void main(String[] args) {
    // Code
  }
}
`

const python = 
`
def main():
    print("Hello World!")

if __name__ == "__main__":
    main()
`

const javascript = 
`
(function () {
  console.log('Hello World!')
})()
`

const cpp =
`
#include <iostream>
using namespace std;

int main() 
{
    cout << "Hello, World!";
    return 0;
}
`

const haskell =
`
module Main where

main = putStrLn "Hello, World!"
`

const def = `// Code...`

export function defaultCode (lang) {
  switch (lang) {
    case 'java':
      return java
    case 'javascript':
      return javascript
    case 'c++':
      return cpp
    case 'python':
      return python
    case 'haskell':
      return haskell
    default:
      return def
  }
}