const java = `public class Main {
  public static void main(String[] args) {
    // Code
  }
}
`

const python = `
def main():
    print("Hello World!")

if __name__ == "__main__":
    main()
`

const node = `
(function () {
  console.log('Hello World!')
})()
`

const cpp = `
#include <iostream>
using namespace std;

int main() 
{
    cout << "Hello, World!";
    return 0;
}
`

const haskell = `
module Main where

main = putStrLn "Hello, World!"
`

const def = '// Code...'

// eslint-disable-next-line
export function defaultCode(lang) {
  switch (lang) {
    case 'java':
      return java
    case 'node':
      return node
    case 'c':
      return cpp
    case 'python':
      return python
    case 'haskell':
      return haskell
    default:
      return def
  }
}
