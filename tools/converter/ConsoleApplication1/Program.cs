using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Resources;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            string file = string.Empty;

            var path = "photo/";
            var pathByte = "bytearray/";

            Console.WriteLine(String.Format("Convert photo file to byte array"));

            do 
            {
                Console.WriteLine(String.Format("File name from photo folder: "));

                file = Console.ReadLine();

                Console.WriteLine(String.Format("File exist status is: {0}", FileExists(path + file)));

                if (FileExists(path + file))
                {
                    byte[] tmp = ConvertPhotoToByteArray(path + file);
                    char[] split = new char[] 
                    {
                        '.'
                    };

                    string[] fileName = file.Split(split);

                    var newFile = pathByte + (fileName[0]) + ".txt";

                    CreateFile(newFile);
                    InsertContentToFile(tmp, newFile);
                }
            }
            while(!file.Equals("exit") || file != "exit");

            Console.WriteLine(String.Format("Press enter to exist..."));
            Console.ReadLine();
        }

        static bool FileExists(string file)
        {
            return File.Exists(file);
        }

        static byte[] ConvertPhotoToByteArray(string file)
        {
            return File.ReadAllBytes(file);
        }

        static void CreateFile(string file)
        {
            File.Create(file)
               .Dispose();
        }

        static void InsertContentToFile(byte[] array, string file)
        {
            File.WriteAllBytes(file, array);
        }
    }
}