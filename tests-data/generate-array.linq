<Query Kind="Statements" />

var fileName = "native-x64.exe";

var scriptDirectory = Path.GetDirectoryName(Util.CurrentQueryPath);
var filePath = Path.Combine(scriptDirectory, fileName);

var bytes = File.ReadAllBytes(filePath);

var output = new StringBuilder();
output.Append("export const renameMe: number[] = [");

if (bytes.Length > 0)
{
	output.Append(bytes[0]);
}

for (int o = 1; o < bytes.Length; o++)
{
	output.Append($", {bytes[o]}");
}

output.Append("];");
output.ToString().Dump();