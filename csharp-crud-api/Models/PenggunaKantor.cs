using System.ComponentModel.DataAnnotations.Schema;

using System.ComponentModel.DataAnnotations;

namespace Models
{
    [Table("pengguna")]
    public class PenggunaCabang
    {
        public int id;

        public int cabang;

        public string? nama;
        public string? alamat;
        public string? kodePos;

        public string? provinsi;
        public string? namaCabang;

        public string? kodeCabang;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public int Cabang
        {
            get { return cabang; }
            set { cabang = value; }
        }
        public string? Nama
        {
            get { return nama; }
            set { nama = value; }
        }

        [Column("alamat")]
        public string? Alamat
        {
            get { return alamat; }
            set { alamat = value; }
        }

        public string? KodePos
        {
            get { return kodePos; }
            set { kodePos = value; }
        }

        [Column("provinsi")]
        public string? Provinsi
        {
            get { return provinsi; }
            set { provinsi = value; }
        }

        public string? KodeCabang
        {
            get { return kodeCabang; }
            set { kodeCabang = value; }
        }
        public string? NamaCabang
        {
            get { return namaCabang; }
            set { namaCabang = value; }
        }
    }
}
