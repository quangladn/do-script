##do-script
#syntax 
out "content"
out 123
out 1 + 1
out true
out $varName
resurt:
  token:
    ['out','string:"content"'],
    ['out','num:123'],
    ['out','expr:1+1'],
    ['out','bool:true'],
    ['out','var:$varName']
  output:
    content
    123
    2
    true
    hello

$varName = "hello"
$number = 123
$boolern = true
$Expr = 1 + 1
$newName = $varName

resurt:
  token:
    ['var:$varName','equal','string:"hello"'],
    ['var:$number','equal','num:123'],
    ['var:$boolern','equal','bool:true'],
    ['var:$Expr','equal','num:2'],
    ['var:$newName','equal','var:$varName'],
  varList:
    {'var:$varName':'string:"hello"',
    'var:$number':'num:123',
    'var:$boolern':'bool:true',
    'var:$Expr':'num:2',
    'var:$newName':'var:$varName'}
